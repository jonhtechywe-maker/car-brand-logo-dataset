# GitHub Pages Deployment Guide

## Quick Start

Your car logos gallery website is ready! Follow these steps to deploy it on GitHub Pages:

### 1. Push Changes to GitHub

If you haven't already, push the `docs` folder to your repository:

```bash
git add docs/
git commit -m "Add GitHub Pages website for car logos gallery"
git push origin main
```

### 2. Enable GitHub Pages

1. Go to your repository: https://github.com/jonhtechywe-maker/car-brand-logo-dataset
2. Click on **Settings** (tab at the top)
3. In the left sidebar, click **Pages**
4. Under "Source", select:
   - Branch: `main`
   - Folder: `/docs`
5. Click **Save**

### 3. Wait for Deployment

GitHub will automatically build and deploy your site. This usually takes 1-3 minutes.

You can check the deployment status in the **Actions** tab of your repository.

### 4. Access Your Website

Once deployed, your website will be available at:

```
https://jonhtechywe-maker.github.io/car-brand-logo-dataset/
```

## Features Included

✅ **Modern Design**: Glassmorphism effects with smooth animations
✅ **Dark/Light Theme**: Toggle with persistent preference
✅ **Real-time Search**: Filter logos by manufacturer name
✅ **Responsive Layout**: Works on mobile, tablet, and desktop
✅ **Performance**: Lazy loading images, debounced search
✅ **Keyboard Shortcut**: Press `Ctrl+K` or `Cmd+K` to focus search

## Files Created

- `docs/index.html` - Main HTML structure
- `docs/styles.css` - Styling with theme support
- `docs/app.js` - JavaScript application logic

## Testing Locally

To test the website locally before deploying:

1. Using Python:

```bash
cd docs
python -m http.server 8000
```

Then open: http://localhost:8000

2. Using Node.js:

```bash
cd docs
npx serve
```

3. Using VS Code Live Server:

- Install "Live Server" extension
- Right-click on `docs/index.html`
- Select "Open with Live Server"

## Customization

### Change Colors

Edit `docs/styles.css` and modify the CSS variables in the `:root` section.

### Add Custom Logos

1. Add images to `local-logos/`
2. Update `local-logos/metadata.json`
3. Run `npm start` to regenerate `logos/data.json`
4. Push changes to GitHub

### Update Content

Edit `docs/index.html` to modify the header, footer, or add new sections.

## Troubleshooting

**Website not loading?**

- Check that GitHub Pages is enabled in Settings → Pages
- Verify the branch is set to `main` and folder to `/docs`
- Wait a few minutes for deployment to complete

**Logos not showing?**

- Ensure `logos/data.json` is in the repository
- Check browser console for errors (F12)
- Verify URLs in `data.json` point to the correct repository

**Search not working?**

- Check that `app.js` is loaded (view page source)
- Open browser console to check for JavaScript errors

## Next Steps

🚀 Share your website URL with others
📱 Test on different devices
⭐ Add more features like filters, sorting, or categories
📊 Add analytics (Google Analytics, Plausible, etc.)
