# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

> This starter template also has **Axios** and **React Router** out of the box.

## Release Workflow

This project includes a GitHub Actions workflow that automatically creates releases with branch archives. The workflow creates zip files for each branch, excluding unnecessary files using a dynamic `.zipignore` system.

### .zipignore System

The release workflow automatically generates a `.zipignore` file if one doesn't exist. This file controls which files and directories are excluded from the release zip files.

#### Default Exclusions

The workflow creates a `.zipignore` file with the following default exclusions:

- **Version control and CI/CD files**

  - `.git/` - Git repository metadata
  - `.github/` - GitHub Actions and workflows

- **Dependencies and build artifacts**

  - `node_modules/` - Node.js dependencies
  - `.next/` - Next.js build output
  - `out/` - Output directory for releases
  - `temp_zip_dir/` - Temporary directory used during zip creation

- **Log files**

  - `*.log` - All log files

- **Environment and configuration files**

  - `.env*` - Environment variable files

- **System files**

  - `.DS_Store` - macOS system files
  - `Thumbs.db` - Windows system files

- **Self-exclusion**
  - `.zipignore` - The ignore file itself

#### Customization

You can create your own `.zipignore` file in the repository root to override the default exclusions. The workflow will use your custom file if it exists, otherwise it will generate the default one.

#### Workflow Details

The release workflow:

1. Checks for an existing `.zipignore` file
2. Creates a default one if none exists
3. Uses both `.zipignore` and `.gitignore` to exclude files from zip creation
4. Creates zip archives for all branches
5. Uploads them as release assets

To trigger a release, manually run the "Create Release with Branch Archives" workflow from the GitHub Actions tab.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
