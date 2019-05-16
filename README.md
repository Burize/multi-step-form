## MULTI STEP FORM 

Multi step form for creating domain. There are configuration name, server specifications, personal data, etc.

### Used features

- React/Redux;
- Typescript;
- [Axios](https://github.com/axios/axios) for handle http actions;
- [Redux-thunks](https://github.com/reduxjs/redux-thunk). On this project, working with async events handling via thunks, unlike the [redux-saga](https://github.com/redux-saga/redux-saga) as usual. There was a desire to try thunks, they are popular, but as a result,   redux-saga provides a more adequate abstraction (layer) between the redux and the api module, and does not carry more code than the thunks;
- [React Final Form](https://github.com/final-form/react-final-form) to create and manage a form;
- [Antd](https://github.com/ant-design/ant-design/) as components kits. There are few drawbacks: the community is mostly Chinese and there are problems with modularity (at a minimum, the component that uses the icons loads all the icons from the antd ≈ 500Kb.

### Project launch
For success submission form and creating domain you need running [back-end rest server](https://github.com/Burize/multi-step-form-backend). (it's     very trivial)

### NPM scripts

- ```npm run dev``` for development environment in watch mode
- ```npm run prod``` for production environment in watch mode
- ```npm run analyze:dev``` for bundle analyzing

#### TODO
- [ ] Complete desktop design(markup);
- [ ] Add adaptive markup(mobile markup);
