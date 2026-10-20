# Your Portfolio: Complete Beginner's Guide

This guide assumes you know **nothing** about React, GitHub, or hosting. Follow the steps in order and do not skip. Each part ends with a "you should see" line so you know it worked.

Total time: about 1 to 1.5 hours the first time.

---

## What you got

A React version of your portfolio, with the same pastel look, plus:

- **Clickable project pages**: every card opens its own detailed page (role, tools, problem, solution, what you learned, screenshots, links).
- **Animated buttons** (spring bounce + shine on hover), scroll fade-ins, page transitions.
- **An admin page at `yoursite.com/admin`**: log in, fill a form, press **Save**. A new project appears on your site. No code touching.

### How the "no coding" part works (important to understand)

Your website is built from two kinds of things:

1. **Design** (the code): how things look. You rarely touch this.
2. **Content** (two small data files): your projects, about text, contact info.

The admin page is just a friendly form for editing the content files. When you press **Save**, it saves the change to your GitHub, and your hosting service (Netlify) automatically rebuilds the site. **Your change goes live about 1 minute later.** That delay is normal.

### Folder map

```
portfolio/
├── public/
│   ├── admin/            ← the admin page (index.html + config.yml)
│   └── uploads/          ← your images and CV live here
├── src/
│   ├── content/
│   │   ├── projects.json ← all your projects (the admin edits this)
│   │   └── site.json     ← about, education, contact (the admin edits this)
│   ├── components/       ← reusable pieces (buttons, cards, navbar)
│   ├── pages/            ← Home.jsx and ProjectDetail.jsx
│   └── styles.css        ← colors, fonts, spacing
├── index.html
└── package.json
```

---

## Part 1: Install two free programs

1. **Node.js**: go to https://nodejs.org and download the **LTS** version. Install it with all default options.
2. **VS Code**: go to https://code.visualstudio.com, download and install it. This is where you will open your project.

**Check it worked:** open the Start menu (Windows) or Spotlight (Mac), search **Terminal** (or "Command Prompt"), open it, type `node -v` and press Enter. You should see a version number like `v22.x.x`.

---

## Part 2: Run the website on your own computer

1. Unzip `portfolio.zip` somewhere easy, like your Desktop. You get a folder named `portfolio`.
2. Open **VS Code** → **File → Open Folder** → choose the `portfolio` folder.
3. In VS Code, open the built-in terminal: **Terminal → New Terminal**.
4. Type this and press Enter (this downloads the tools React needs; wait 1 to 2 minutes):
   ```
   npm install
   ```
5. Then type:
   ```
   npm run dev
   ```
6. You will see a line like `Local: http://localhost:5173/`. Hold Ctrl (or Cmd) and click it, or paste it into your browser.

**You should see:** your portfolio with a pink gradient background. Click a project card to see the detail page.

To stop the site, click in the terminal and press `Ctrl + C`. To start it again, run `npm run dev` again.

> Pictures will look empty at first, because your image files are not in the project yet. Part 3 fixes that.

---

## Part 3: Bring in your pictures and CV

Copy these files from your old portfolio folder into `portfolio/public/uploads/`:

- `coding.png`, `cert.jpg`, `creative.png` (your project covers)
- Your profile picture (for example `ProfileChibi.svg`)
- Your CV as a PDF (for example `Insyirah-CV.pdf`)

Then open `src/content/site.json` and fill in these two lines:

```json
"cvFile": "/uploads/Insyirah-CV.pdf",
"profileImage": "/uploads/ProfileChibi.svg",
```

Use your real file names. Save the file (Ctrl+S). The website in your browser updates by itself.

**You should see:** your profile picture in the About section, a **Download CV** button on the home page, and covers on the project cards.

> Later you will do this from the admin page instead (no code). This first time is just to get your existing files in.

---

## Part 4: Put it online and turn on the admin page

You need two free accounts: **GitHub** (stores your files) and **Netlify** (shows your website to the world).

### 4a. Put your project on GitHub

1. Sign up at https://github.com.
2. Install **GitHub Desktop**: https://desktop.github.com and sign in.
3. In GitHub Desktop: **File → Add local repository** → choose your `portfolio` folder. If it says "not a git repository", click **create a repository**.
4. Write a summary like `first version`, click **Commit to main**.
5. Click **Publish repository**. Choose a name like `my-portfolio`. You can keep it private. Click **Publish**.

**Write down:** your GitHub username and repository name, for example `insyirah/my-portfolio`.

### 4b. Tell the admin page which repository is yours

1. In VS Code, open `public/admin/config.yml`.
2. Find this line near the top:
   ```yaml
   repo: YOUR-GITHUB-USERNAME/YOUR-REPO-NAME
   ```
3. Replace it with yours, for example:
   ```yaml
   repo: insyirah/my-portfolio
   ```
4. Save. In GitHub Desktop, commit (summary: `set admin repo`) and click **Push origin**.

### 4c. Publish the website with Netlify

1. Sign up at https://www.netlify.com (choose **Sign up with GitHub**).
2. Click **Add new site → Import an existing project → GitHub**, and allow access.
3. Pick your `my-portfolio` repository.
4. Use these settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy**. After a minute or two you get a web address like `something.netlify.app`.

**You should see:** your portfolio live on the internet. You can rename the address in **Site configuration → Change site name**.

### 4d. Create your login key (called a "token")

The admin page needs permission to save changes to your GitHub. You give it a token, which works like a password just for this one repository.

1. Open `https://YOUR-SITE-ADDRESS/admin` (add `/admin` to the end of your website address).
2. Click **Sign In with Token**. It shows a link to GitHub's token page with the right permissions already selected. Click it.
3. On GitHub, set:
   - **Repository access:** *Only select repositories* → choose `my-portfolio`
   - **Permissions → Contents:** *Read and write*
4. Click **Generate token**, then **copy** the token (you only see it once).
5. Paste it back into the admin page and sign in.

**You should see:** the admin dashboard with **Projects** and **About & Contact** on the left.

> **Keep your token private**, like a password. Only sign in on your own devices. If you ever lose track of it, delete it on GitHub (Settings → Developer settings → Personal access tokens) and make a new one.

---

## Part 5: Everyday use. This is the "I'm just a user" part

### Add a new project

1. Go to `yoursite/admin` and sign in.
2. Click **Projects → All Projects → Add Projects** (the add button on the list).
3. Fill the form:

| Field | What to put |
|---|---|
| Title | Name of the project |
| Page address (slug) | Lowercase with dashes, like `weather-app`. **Must be different for every project.** |
| Category | Small label above the title, like `Python` or `Canva` |
| Short summary | 1 to 2 sentences, shown on the card |
| Cover image | Click to upload a picture |
| My role / Duration / Team | Optional facts shown in boxes |
| Tools used | Add one item per tool (React, Figma...) |
| Overview, Problem, Solution, What I learned | Write freely. Any box you leave empty is hidden automatically |
| Gallery | Upload screenshots |
| Links | Buttons at the bottom: "View demo", "GitHub", "Slides" and so on |

4. Click **Save**.
5. Wait about 1 minute, then refresh your website.

**You should see:** a new card, and clicking it opens a full detail page.

### Edit or remove a project
Open it in the admin, change what you want, **Save**. To delete, use the delete/remove button on that item in the list, then **Save**.

### Change your About, Education, Contact, CV
Click **About & Contact → Site Info**, edit, **Save**.

### Tips for a good project page
Recruiters usually scan, not read. Make sure each project answers: *What was it? What was your part? What tools? What did you learn? Can I see it?* Screenshots matter a lot, so add at least 2 or 3.

---

## Part 6: Small changes in code (optional, safe ones)

### Change the colors
Open `src/styles.css`. At the very top you will see:

```css
:root {
  --rose: #b76b7b;
  --sand: #c2a192;
  --blush: #ffc5d3;
  ...
}
```
Change the color codes and the whole site updates.

### Use your own background picture or GIF
1. Put `background.gif` into the `public/` folder.
2. In `src/styles.css`, find `.bg {` and replace the `background:` line with:
   ```css
   background: url('/background.gif') center / cover no-repeat;
   ```
3. Optional: delete `<Background />` from `src/App.jsx` if you do not want the floating bubbles.

### Use your SVG logo instead of text
In `src/components/Navbar.jsx`, replace `{site.logoText}` with `<img src="/uploads/CodeByInsyi.svg" alt="CodeByInsyi" style={{ height: 40 }} />`.

### Use the animated button anywhere
```jsx
<AnimatedButton href="/#contact">Contact me</AnimatedButton>
<AnimatedButton href="https://github.com/you" external variant="outline">GitHub</AnimatedButton>
```

---

## Part 7: When something goes wrong

| Problem | Fix |
|---|---|
| `npm is not recognized` | Node.js is not installed or the terminal was open before installing. Install it, then close and reopen VS Code. |
| White/blank page when running | Press `F12` in the browser → **Console** tab. A red error tells you which file has a typo. Check the last file you edited. |
| Picture does not show | The path must start with `/uploads/` and the file name must match exactly, including capital letters (`Cover.PNG` and `cover.png` are different). |
| Admin says repository not found | The `repo:` line in `public/admin/config.yml` is wrong, or your token does not have access to that repository. |
| Saved in admin but the site did not change | Wait 1 to 2 minutes, then hard refresh (`Ctrl+Shift+R`). In Netlify → **Deploys**, check if the build failed. |
| A project page says "not found" | Two projects share a slug, or the slug has spaces or capitals. Use lowercase and dashes only. |
| Refreshing a project page gives 404 | Make sure `public/_redirects` still exists (Netlify uses it). |

---

## Part 8: Where to go next

Once this works, good next steps are:

1. Add your other projects (class projects, hackathons, design work) with screenshots.
2. Replace the placeholder text in the three starter projects.
3. Change the two Canva links from **edit** links to **view** links, so visitors cannot land in edit mode.
4. Add a contact form, dark mode, or a skills section.
5. Learn React properly. The official tutorial at https://react.dev/learn is excellent and fits this project well. Each file in `src/components` is a good small example.

You can always come back and ask me to add a section, a new animation, or a feature, and I will explain what I changed.
