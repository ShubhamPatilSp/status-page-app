# End-to-End Vercel Deployment Guide for StatusTrack

**Goal:** To deploy the full-stack StatusTrack application (Next.js frontend and FastAPI backend) to Vercel.

---

## Introduction

This guide provides a complete, step-by-step walkthrough for deploying your StatusTrack application. Vercel is an ideal platform for this project because it has native support for both Next.js and serverless Python functions, allowing us to deploy our entire monorepo with a single configuration.

We have already prepared the `vercel.json` file, which tells Vercel how to build and route traffic to the frontend and backend. Now, let's get your project live.

---

## Prerequisites

Before you begin, make sure you have the following:

1.  **A GitHub Account:** Your code needs to be hosted on GitHub for Vercel to access it. [Sign up here](https://github.com/join).
2.  **A Vercel Account:** You can sign up for a free Vercel account using your GitHub account. [Sign up here](https://vercel.com/signup).
3.  **Completed Local Setup:** Ensure you have all the necessary environment variables from your local `.env` (backend) and `.env.local` (frontend) files ready.

---

## Step 1: Push Your Project to GitHub

Vercel deploys directly from a Git repository. If your project isn't already on GitHub, you need to create a new repository and push your code to it.

1.  **Create a new repository on GitHub.** You can do this from the GitHub website. Give it a name like `statustrack-app`.

2.  **Initialize Git and push your local code:**
    *   Open your terminal in the root directory of your project (`d:\seven\new`).
    *   Run the following commands, replacing `your-username` and `your-repository` with your actual GitHub details.

    ```bash
    # Initialize a new Git repository (if you haven't already)
    git init

    # Add all your files to staging
    git add .

    # Commit your files
    git commit -m "Initial commit: Ready for deployment"

    # Add your GitHub repository as the remote origin
    git remote add origin https://github.com/your-username/your-repository.git

    # Push your code to the main branch on GitHub
    git push -u origin main
    ```

---

## Step 2: Create and Configure a New Vercel Project

Now you'll create a Vercel project and link it to your new GitHub repository.

1.  **Log in to your Vercel dashboard.**
2.  Click the **"Add New..."** button and select **"Project"**.
3.  **Import your Git Repository:** Vercel will show a list of your GitHub repositories. Find your `statustrack-app` repository and click the **"Import"** button next to it.

4.  **Configure Your Project:** This is the most important step.
    *   **Framework Preset:** Vercel should automatically detect **Next.js**. If not, select it from the dropdown.
    *   **Root Directory:** Because your Next.js app is in the `frontend` subdirectory, you need to tell Vercel where to find it.
        *   Click the **"Edit"** button next to "Root Directory".
        *   Select the `frontend` directory from the list.

    This ensures Vercel runs the Next.js build commands inside the correct folder.

---

## Step 3: Add Environment Variables

Your application needs its secrets and configuration to run. You must add all the environment variables from your local setup to Vercel.

1.  In the "Configure Project" screen, expand the **"Environment Variables"** section.
2.  Add each variable from your `backend/.env` and `frontend/.env.local` files. **This is a critical step.**

    You will need to add the following keys and their corresponding values:

    *   `MONGODB_URI`: Your full MongoDB connection string.
    *   `AUTH0_DOMAIN`: Your Auth0 domain (e.g., `dev-example.us.auth0.com`).
    *   `AUTH0_API_AUDIENCE`: The unique identifier for your Auth0 API.
    *   `AUTH0_SECRET`: A long, random string for session encryption.
    *   `AUTH0_BASE_URL`: The URL of your deployed Vercel app (you can add this after the first deployment).
    *   `AUTH0_CLIENT_ID`: Your Auth0 application's Client ID.
    *   `AUTH0_CLIENT_SECRET`: Your Auth0 application's Client Secret.
    *   `NEXT_PUBLIC_API_ROOT_URL`: The public URL of your Vercel deployment. This will be the same as `AUTH0_BASE_URL`.

    **Important:** For `AUTH0_BASE_URL` and `NEXT_PUBLIC_API_ROOT_URL`, you can use the default domain Vercel provides (e.g., `your-project.vercel.app`) after the first deployment succeeds. You will need to update these values and redeploy.

---

## Step 4: Deploy!

Once you've configured the root directory and added all environment variables, you're ready to go.

1.  Click the **"Deploy"** button.
2.  Vercel will start the build process. You can watch the build logs in real-time. It will first build the Python backend and then the Next.js frontend.
3.  If everything is configured correctly, the deployment will succeed, and you'll see a congratulations screen with a screenshot of your new site.

---

## Step 5: Post-Deployment Configuration

Your app is live, but there are a few final steps to ensure it works correctly.

1.  **Update Environment Variables:**
    *   Go to your project's dashboard on Vercel.
    *   Navigate to **Settings -> Environment Variables**.
    *   Update `AUTH0_BASE_URL` and `NEXT_PUBLIC_API_ROOT_URL` with your final Vercel domain (e.g., `https://statustrack-app.vercel.app`).
    *   This will trigger a new deployment with the updated values.

2.  **Update Auth0 Configuration:**
    *   Go to your Auth0 application settings.
    *   Add your Vercel URL (`https://your-project.vercel.app`) to the **Allowed Callback URLs**, **Allowed Logout URLs**, and **Allowed Web Origins** fields.

3.  **Test Your Live Application:**
    *   Open your Vercel URL.
    *   Try logging in, creating a service, and viewing a public status page to ensure everything is working as expected.

Congratulations! Your full-stack StatusTrack application is now live on Vercel.
