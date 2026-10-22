# cicd03_front_react

React + Vite Todo app deployed to an Ubuntu EC2 instance with GitHub Actions, Docker Compose, and Nginx.

## Run locally

```bash
npm ci
npm run dev
```

## Deploy to EC2

The workflow in `.github/workflows/deploy.yml` runs on pushes to `main` or from the Actions tab. It installs dependencies, builds `dist`, copies the build and Docker files to `~/react-cicd`, then rebuilds and starts the Nginx container.

Before the first deployment:

1. Create an Ubuntu EC2 instance and install Docker Engine with Docker Compose. Add the `ubuntu` user to the `docker` group, then reconnect so the group change takes effect.
2. Configure the EC2 security group for inbound HTTP on port 80 and SSH on port 22. Add HTTPS on port 443 if you configure TLS. Restrict SSH sources where your deployment setup permits.
3. In the GitHub repository, open **Settings → Secrets and variables → Actions** and add:
   - `EC2_HOST`: the instance's public IPv4 address or DNS name
   - `EC2_USERNAME`: `ubuntu` for the standard Ubuntu image
   - `EC2_SSH_KEY`: the private SSH key text for that instance
4. Push the project to `main` or run **Deploy React App to EC2** from the Actions tab.

Keep the private SSH key only in GitHub Secrets. The workflow builds `dist` itself, so the generated build folder stays out of Git.

## Docker files

`Dockerfile` serves the generated Vite build from Nginx. `docker-compose.yml` publishes the container on host port 80. To run the same container locally after building:

```bash
npm run build
docker compose up -d --build
```
