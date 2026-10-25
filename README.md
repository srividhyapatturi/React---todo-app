# My Tasks — React To-Do App

A responsive React task manager with:
- Add tasks
- Mark tasks completed / active
- Filter All, Active, and Completed tasks
- Delete individual tasks
- Clear all completed tasks
- Save tasks in browser localStorage
- Responsive layout for mobile and desktop

## Run locally

1. Install Node.js (LTS) and Git.
2. Extract this ZIP and open the `react-todo-app` folder in VS Code.
3. Open Terminal in VS Code and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL Vite prints in the terminal (usually `http://localhost:5173`).

## Deploy to GitHub Pages

1. Create a new, empty repository on GitHub, for example `todo-app`.
2. In this folder's terminal, configure Git and push the code:

   ```bash
   git init
   git add .
   git commit -m "Create React To-Do app"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/todo-app.git
   git push -u origin main
   ```

   Replace `YOUR-USERNAME` with your GitHub username. If Git says to configure your identity, run:
   `git config --global user.name "Your Name"`
   `git config --global user.email "your-email@example.com"`

3. Run:

   ```bash
   npm run deploy
   ```

4. On GitHub, open your repository → **Settings** → **Pages**. If needed, set the deployment source to the `gh-pages` branch and `/ (root)`.
5. Wait for the deployment to finish. Your URL will usually be:
   `https://YOUR-USERNAME.github.io/todo-app/`

If your repository has a different name, the URL will use that repository name. The deployed link is unique to your own GitHub account.
