# Critics - BeLive Assignment

## Project Execution Setup

### Clone source code from main branch
```
git clone https://github.com/codec-h/demo.git
```

### Install node-modules
```
npm install
```

### Running via local PC - Development
```
npm run serve
```

### Generating production files
```
npm run build
```

>This project is by default configured with Base URL as demo. In order to change as per need, please modify publicPath property in vue.config.js

### Packages utilized in this project
- vue-router - To configure routing among components/views
- vuex - To maintain state data of filters
- bootstrap-vue - To accomodate responsive website
- vue-lazytube - To inline play Youtube video within the same window 
- vue-overlay-loading - To show loading animation during API fetch calls and time-consuming process

### Project Folder Structure
- public
    - index.html
- src
    - assets
    - components
    - header
    - router
    - views
    - App.vue
- main.js