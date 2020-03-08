# prerequisite

1) Install Docker desktop : https://docs.docker.com/install/

   Or 
   
   follow this guide to use Virtualbox: https://itsfoss.com/install-linux-in-virtualbox/

2) install node & npm : https://www.npmjs.com/get-npm

3) install ibmcloud cli :
   
   For Mac & Linux run this command: 
   ```
   curl -sL https://ibm.biz/idt-installer | bash
   ```
   
   For Windows™ 10 Pro, run the following command as an administrator: (Right-click the Windows™ PowerShell icon, and select Run as administrator.)
   ```
   [Net.ServicePointManager]::SecurityProtocol = "Tls12, Tls11, Tls, Ssl3"; iex(New-Object Net.WebClient).DownloadString('https://ibm.biz/idt-win-installer')
   ```
   
# clone repo

```
git clone ...
```

# build on localhost

```
npm install

npm start
```

# build image using Dockerfile

```
docker build . -t watson_cloudant_microservice

docker run -d -p 8080:8080 watson_cloudant_microservice
```

# deploy on kubernetes

Follow this guide to push image to container registry on IBM Cloud :
https://cloud.ibm.com/kubernetes/registry/main/start

Connect to k8s cluster with the instuctions under "Access" tab on the cluster page

Change the deployment.yaml with the right namespace following the namespace in the container registry

```
kubectl apply -f deployment.yaml

kubectl apply -f service.yaml
```

# extra

Monitoring, Networking, Logs, CI/CD, Istio, Helm, Configuration ...
