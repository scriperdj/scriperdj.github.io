---
title: "Building a Resilient & Scalable Kubernetes Setup: Cloud & On-Prem Best Practices"
date: "2023-10-24"
category: "Technology"
---

Last year, we at Quartic.ai tackled a requirement to execute enterprise-wide deployments for some of our clients with the following goals in mind:

- Avoid single point of failure
- Scale to need
- Provide resiliency & redundancy

The clear choice for achieving these goals was Kubernetes orchestration. However, given the stringent data locality and internet access policies of the industries we serve (Life Sciences and F&B), setting up the necessary infrastructure presented its challenges. The idea of having dedicated deployments on various cloud providers or on-premises for each client (based on their IT preference) amplified this complexity.

![Cloud & On-Prem Best Practices](/images/posts/cloud-onprem.webp)

In this article, we'll outline the key considerations for establishing an in-house, resilient, and scalable Kubernetes cluster catering to both cloud and on-premise scenarios. Our insights are drawn from our journey transitioning from a single-node Docker setup to a multi-node Kubernetes cluster.

### Kubernetes distribution

Selecting the right Kubernetes distribution tailored to your needs is crucial. A quick search will reveal a plethora of options, each with its unique focus. For our purposes, we sought a distribution that was nimble enough for single-node setups (ideal for Demo/PoC scenarios) yet robust enough to scale to multiple nodes. K3s emerged as the best fit for our criteria, and we subsequently adopted it as our go-to choice for in-house and on-premises deployments.

![Kubernetes Cluster Architecture](/images/posts/kcl.webp)

### Storage

When deploying stateful applications (a common scenario), determining how to store data resiliently in the face of node failures becomes paramount. Relying solely on StatefulSet deployments with multiple replicas isn't always feasible for every application. Take, for instance, the management of user-uploaded files. This necessitates a distributed volume capable of handling replication, snapshots, and other functionalities internally. We opted for Longhorn, but other alternatives like OpenEBS and Ceph can also be suitable. It's essential to note that these frameworks utilize network storage, which might be susceptible to latency issues. Therefore, it's vital to test your workload within these environments, thoroughly review snapshot configurations, and assess recovery procedures before finalizing your choice.

### Scaling requirements

Determining which applications to scale is contingent on your specific use case. Our application is data-intensive, with the number of devices streaming to the platform varying across client deployments and potentially increasing as they expand to new sites. It's essential to pinpoint the applications affected and craft a clear scaling strategy for them. For instance, if your architecture includes web servers and databases, it's prudent to optimize the capacity for each pod. Additionally, consider setting up Horizontal Pod Autoscaling (HPA) to activate once pod limits approach defined thresholds — assuming your cluster has the requisite resources available for scaling.

### High availability

Based on the composition of your platform, it's imperative to identify the critical applications that must maintain high availability (HA) to endure node failures. Typically, databases and web servers require an HA configuration. If you're utilizing Postgres, consider Patroni as a suitable solution. For caching needs, Redis Sentinel is worth exploring. In our case, Kafka is employed for streaming data from edge devices. Given its significance, ensuring Kafka operates in HA mode was paramount. We found the Strimzi operator to be exceptionally effective for this purpose.

### Monitoring stack

Gaining visibility into your deployment is crucial, both for understanding application performance and for effective troubleshooting. We employ Grafana in tandem with Prometheus to monitor our Kubernetes cluster. Beyond the standard metrics, it's beneficial to integrate custom events and alerts tailored to your specific use case.

### Nodes & resource limits

Determine the optimal number of nodes (both workers and masters) and set resource limits for your pods based on the performance and resilience needs of your stack. Beyond its core functions, Kubernetes also demands auxiliary resources to operate efficiently. Arrive at these figures by thoroughly testing your workload and understanding its resiliency prerequisites. The monitoring stack, as discussed earlier, can greatly aid in fine-tuning these configurations.

### Backup & restore

Lastly, it's imperative to establish a robust backup and restore strategy to safeguard against catastrophic failures. While on-premises deployments might offer fewer options, cloud providers typically furnish snapshot capabilities for VMs, which can prove invaluable. Additionally, the distributed storage frameworks and HA configurations previously discussed come equipped with backup and snapshot features. These can be set up to routinely save backups to cloud-based blob storage.

I trust you found the insights shared above valuable. For more enlightening topics on engineering & AI, I invite you to explore the [Quartic.ai blog](https://www.quartic.ai/blog).

