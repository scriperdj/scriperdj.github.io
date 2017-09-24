---
layout: post
title:  "Import data from CSV files to HBase using Spark"
date:   2017-09-24
categories: [Java]
tags: [hbase,spark,java,csv]
comments: true
---
Spark has multiple tutorials, examples & Stackoverflow solutions. But most of them are in Scala. If you want to develop something in Java, you are left with what is available in the Spark's examples package & few blog posts using older APIs for reference. This post aims to be an additional reference for the new Spark API(2.1.X) focusing on importing data from CSV files into HBase table.

Have coded this application to be generic to handle any CSV file schema. But no transformation on the data will be done, just dumps the data to hbase table (The table needs to be created before executing the app). The source code of this application is available in this [Git repo](https://github.com/scriperdj/import-csv-to-hbase-spark){:target="_blank"}. Please read the README file to understand about the inputs. Feel free to modify for your requirements.

##### Prerequisites
Either localhost or remote machines running following services are required for executing this application.  
* HDFS, YARN, HBase from the Hadoop ecosystem
* Spark distribution 2.1.1

##### Install Hadoop, HBase & Spark in Pseudo-Distributed mode

You can follow the official documentations available for all the above frameworks to install them in remote machine. Following steps shows how to setup in local machine. (Assuming you have Java 1.8 already installed)

**Hadoop**
* Download the distribution from [Apache](http://www.apache.org/dyn/closer.cgi/hadoop/common/){:target="_blank"} and extract to home. Rename the folder to `hadoop`.
* Modify `core-site.xml` & `hdfs-site.xml` as mentioned in [here](http://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-common/SingleCluster.html#Pseudo-Distributed_Operation){:target="_blank"}

**HBase**
* Download distribution from [Apache](http://www.apache.org/dyn/closer.cgi/hbase/){:target="_blank"} and extract to home. Rename the folder to `hbase`.
* Modify `hbase-site.xml` as mentioned in [here](https://hbase.apache.org/book.html#quickstart){:target="_blank"}

**Spark**
* Download zip from [here](https://spark.apache.org/downloads.html){:target="_blank"} & extract to home. Rename the folder to `spark`.

##### Start all the required services
{% highlight bash %}
$ ~/hadoop/sbin/start-dfs.sh
$ ~/hadoop/sbin/start-yarn.sh
$ ~/hbase/bin/start-hbase.sh
{% endhighlight %}

You can also have all above commands saved in a file `start.sh` in Home so you could run all services from single bash file.

##### Code Walkthrough

The main class 'ImportCsvToHBase' is small and doesn't need lot of explanation. It starts by reading the Yaml file. Creates Spark session & hbase configurations needed for connection.

<script src="http://gist-it.appspot.com/https://github.com/scriperdj/import-csv-to-hbase-spark/blob/master/src/main/java/examples/spark/ImportCsvToHBase.java?slice=69:90"></script>

It then broadcasts the row key & value data for the HBase table so the info is available to the worker nodes for processing.

RDD of rows is created from the given CSV file. The data is converted into rows for hbase table based on the schema provided in the `params.yml` file.

<script src="http://gist-it.appspot.com/https://github.com/scriperdj/import-csv-to-hbase-spark/blob/master/src/main/java/examples/spark/ImportCsvToHBase.java?slice=94:122"></script>

And the RDD is saved to HBase table at the end & Spark session is stopped.

##### Execution & debugging

* Create a fat jar with all the dependencies by following command. (Assuming Maven is already installed.)
{% highlight bash %}
$ mvn package
{% endhighlight %}

* Submit the jar using spark-submit script along with the location of params.yml file as argument.
{% highlight bash %}
$ ~/spark/bin/spark-submit --class examples.spark.ImportCsvToHBase --master yarn target/import-csv-to-hbase-1.0-SNAPSHOT-shaded.jar params.yml
{% endhighlight %}

* Since this is a batch application, you can see all the logs in the console. Also you can watch the status in the YARN UI at localhost:8088
![YARN]({{ site.baseurl }}/images/posts/Screenshot-2017-9-24.png){:height="500px" width="700px"}

* The logs in console won't show the worker logs. That can be viewed from below command. (Change the application Id)
{% highlight bash %}
$ ~/hadoop/bin/yarn logs -applicationId application_1506253750715_0008
{% endhighlight %}
