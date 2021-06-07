---
layout: post
title:  "It’s time to ditch Apache Spark and love Dask"
date:   2021-6-5
category: Spark
tags: [spark,dask,algorithm]
comments: true
crosspost_to_medium: false
---

After a long time, I couldn't stop myself from writing this blog. This is not about comparing two of these frameworks but if you are interested in that, Dask is humble enough to include that in their [official documentation](https://docs.dask.org/en/latest/spark.html) as well.  Am just sharing personal opinion from building applications using both of these frameworks.
![spark_dask]({{ site.baseurl }}/images/posts/spark_dask.jpg)
##### Spark is great, but...
At Quartic.ai, we have built multiple jobs using Apache Spark that does ingress, ETL, score models, etc for different kinds of data which are of both streaming & batch nature. Spark's rich set of APIs would make your job easy if you have everything as dataframes & RDDs spread across multiple nodes in cluster. But the problem lies in building the required dataframes just so we can make use of the APIs provided by Spark. This is the time to call

![Dataengineers assemble]({{ site.baseurl }}/images/posts/avengers.jpg)

We have data streaming at high frequency from multiple IoT sensors. Now imagine building pipeline to serve thousands of machine learning models on top of this data using using Apache Spark. Here is a nice [blog by Conor Murphy](https://databricks.com/blog/2020/05/19/manage-and-scale-machine-learning-models-for-iot-devices.html) where he explains about training & deploying multiple models at scale. This is great, but in practice we don't just deploy one model per device. There can be multiple models for one sensor. And there are also instances where prediction from one model is feature to bunch of other models. Generating streaming datasets for this usecase without introducing skewness to your pipelines requires you to carefully choose the partitioning strategy (whether to use device-id, model-id or something else as partition key to kafka topics). 

##### Did it work? well...

After undergoing all trouble of building pipelines that performs cleanups, ETLs, denormalizations on data we realized we can't scale beyond a limit without scaling the cluster if we don't want to compromise on batch intervals(which was set to 30sec). And the max no. of models we could deploy in our cluster was also surprisingly small. The max we could serve on a cluster with 24 cores was about 600 models. 

Our problem was not just ML models, there are custom code written by our platform users that had to be executed on streaming data which may be used as features to multiple ML models. So we have to implement ways to resolve such dependencies as well.  This is not straight forward in Spark. We had to create different pipelines & loopbacks to do this which wasn't really efficient if you are already on resource crunch. 

![pipeline]({{ site.baseurl }}/images/posts/influx_pipeline.png)

##### Thinking small

It became clear that if we can build a DAG ourselves, there is scope of avoiding some redundant work. Spark builds DAGs before executing jobs, but we couldn't find any high-level APIs that we could use. We had been using a small python library called [Graphkit](https://github.com/yahoo/graphkit) for some application before. So we wanted to give it a try without thinking a lot on scalability. Graphkit turned out to be great for our problem of resolving dependencies. 
 ![graphkit]({{ site.baseurl }}/images/posts/graphkit.png)
It works for small applications, toy projects/ POCs, scaling this is a challenge. 

##### Meet the Graphkit on steroids, Dask

While brainstorming this approach, my teammate recommended Dask. I always thought it was for processing pandas dataframes at scale which is something that Spark is already good at. But never knew of their other APIs. Dask's [Delayed API](https://docs.dask.org/en/latest/delayed.html) is exactly what we wanted. Not only it allowed us to build the required DAG using low level APIs, the graph can be executed in distributed fashion at scale as well.

![graphkit]({{ site.baseurl }}/images/posts/dask_graph.png)

The API was quite powerful & we were able to quickly build a solution by clubbing Graphkit & Dask to serve thousands on models on the same 24 core cluster that also has the dependencies resolved dynamically. It was so beautiful to see thousands of nodes getting processed in few seconds.

##### Conclusion

Like I said in beginning, this isn't an one-o-one comparison. But if you had read the comparison doc, you know which one to pick when. There are situations in a startup company where sometimes we try to get the job done using the tools we know or heard as we have to reach the market faster. Though this involves implementing workarounds, it may not always be a best solution. At Quartic, we are always on the lookout to improve our platform and we are glad how Dask worked out for us.


