---
layout: post
title:  "Batch processing of multi-partitioned Kafka topics using Spark with example"
date:   2018-02-03
categories: [Scala]
tags: [kafka,spark,scala]
comments: true
crosspost_to_medium: true
---
There are multiple usecases where we can think of using Kafka alongside Spark for streaming realtime ETL processing  involved in projects like tracking web activities, monitoring servers, detecting anomalies in Engine parts and so on. The architecture involves the source producing data which is sent to a Kafka topic & the consumer processes the data for every predefined batch interval.

![Spark Kafka]({{ site.baseurl }}/images/posts/img.jpg){:height="400px" width="300px"}

##### Why Batch processing from Kakfa?
Any batch processing logic would need to extract required data from the storage warehouse and depending on the amount of data, this operation would involve a lot of time. Even with HBase / ElasticSearch which allows parallel reads with respect to the region splits / shards, the time involved in reading data is considerable.

[Kafka as a Storage System](https://kafka.apache.org/intro#kafka_storage){:target="_blank"} gives us all benefits of the fault-toleran, distributed storage and the throughput of Streaming system.

Apart from usual producer/consumer setup, Kafka also provides ways of rereading messages either from beginning of between certain offset ranges. Though the default retention period of messages in Kafka topic is 30 days, it could be altered or provided as parameter while creating new topic making it an excellent source with Historic + Realtime data.

##### With Spark
Using Spark to process messages in Kafka topic would obviously fasten things up as each Spark executor will work on each Kafka partition. So choosing right partitioning logic for your Kafka topic is important if you want to take advantage of the parallelism Spark provides.

The [Spark-Kafka integraion](https://spark.apache.org/docs/latest/streaming-kafka-0-10-integration.html){:target="_blank"} provides two ways to consume messages.
* *KafkaUtils.createDirectStream* for Streaming
* *KafkaUtils.createRDD* for Batch

In our example Spark application, we would be using *KafkaUtils.createRDD*.

##### Example Application
We shall consider users browsing behaviour data generated from Ecommerce website. Such behaviour data can have a large schema with users IP, browser details and much more. But to keep it simple, we shall use below schema.

{% highlight javascript %}
{
	"customer": "cus01",
	"product": "PD0021",
	"category": "PD0021",
	"ts": "1516978415"
}
{% endhighlight %}

##### Prerequisites
Either localhost or remote machines running following services are required for executing this application.
* Apache Kafka 0.11
* Hadoop 2.8.1
* Spark distribution 2.1.1

*You can refer [this post](/java/2017/09/24/import-data-from-csv-files-to-hbase-using-spark.html){:target="_blank"} for setting up the environment locally.*

##### Scope of Spark job
* Get partition & offset details of provided Kafka topics.
* Create DataFrame with the data read.
* **Find Top trending product in each category based on users browsing data.**

The source & execution guide is available in [this Git repository](https://github.com/scriperdj/kafka_batch_processing_using_spark_sample){:target="_blank"} and should be easy to understand if you are already familiar with[ Spark style of programming](https://spark.apache.org/docs/latest/quick-start.html){:target="_blank"}
