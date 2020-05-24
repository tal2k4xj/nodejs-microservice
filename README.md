# prerequisite

1) Register IBM Cloud: https://ibm.biz/BdqrvA

2) Install Docker desktop: https://docs.docker.com/install/

   Or 
   
   follow this guide to use Virtualbox: https://itsfoss.com/install-linux-in-virtualbox/

3) install node & npm: https://www.npmjs.com/get-npm

4) install ibmcloud cli: https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started#step1-install-idt
   
# How to create a Microservice

In this workshop we will go through the process of creating a microservice using the right tools and technologies.
We will build a NodeJS application that connected to two other Cloud services (Watson Visual Recognition and Cloudant).
The goal of this workshop is to help developers understand how to use the right tools on IBM Cloud and leverage them to build better microservices.

# clone repo

```
git clone https://github.com/tal2k4xj/nodejs-microservice.git
```

# build on localhost

```
cd nodejs-microservice/app

npm install

npm start
```

# build image using Dockerfile

```
docker build  -t watson_cloudant_microservice . 

docker run -d -p 8080:8080 watson_cloudant_microservice
```

# deploy on kubernetes

Follow this guide to push image to container registry on IBM Cloud :
https://cloud.ibm.com/kubernetes/registry/main/start

Connect to k8s cluster with the instuctions under "Access" tab on the cluster page and create namespace.

Change the deployment.yaml with the right namespace following the namespace in the container registry

```
cd ../kubernetes/

docker build  -t watson_cloudant_microservice . 

docker tag watson_cloudant_microservice us.icr.io/<my_namespace>/watson_cloudant_microservice

docker push us.icr.io/<my_namespace>/watson_cloudant_microservice

ibmcloud cr image-list

kubectl apply -f deployment.yaml

kubectl apply -f service.yaml

kubectl apply -f configmap.yaml
```

# extra

Monitoring, Networking, Logs, CI/CD, Istio, Helm, Configuration ...
