# 🐳 Docker Architecture (Client–Server Model)

Docker follows a **client–server architecture**, where the **Docker Client** communicates with the **Docker Daemon** to build, run, and manage containers.

---

## ⭐ Components

### 1. **Docker Client**

* CLI tool used by developers (`docker build`, `docker run`, etc.)
* Sends requests to Docker Daemon via REST API.
* Acts as the **user interface** for Docker.

---

### 2. **Docker Daemon (`dockerd`)**

* The **core engine** of Docker.
* Runs on the host machine.
* Performs heavy tasks:

  * Building images
  * Running containers
  * Managing images, networks, volumes
* Listens for Docker API requests from the client.

---

### 3. **Docker Images**

* **Read-only templates** used to create containers.
* Built from a **Dockerfile**.
* Contain:

  * Application code
  * System libraries
  * Dependencies
* Stored locally or in a registry.

---

### 4. **Docker Containers**

* **Runnable instances** of Docker images.
* Lightweight and isolated.
* Include everything needed to run the app.
* Can be started, stopped, moved, or deleted.

---

### 5. **Docker Registry**

* Storage for Docker images.
* Can be:

  * **Docker Hub** (public)
  * **AWS ECR**, **GitHub Container Registry**, etc. (private)
* Docker Daemon pulls images from here or pushes new images.

---

## 🔗 **Flow Summary**

1. User runs a command → **Docker Client**
2. Client sends request → **Docker Daemon**
3. Daemon:

   * Builds image
   * Runs containers
   * Pushes/pulls images from registry
4. Containers run using the pulled or built images.
