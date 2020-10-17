(window.webpackJsonp = window.webpackJsonp || []).push([
   [0],
   {
      1038: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            __webpack_require__.d(__webpack_exports__, 'SignIn', function() {
               return SignIn;
            });
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               76,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               113,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
               36,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
               73,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
               75,
            ),
            yup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(49),
            _src__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(39),
            _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(471),
            react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(0),
            _material_ui_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8),
            _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(100),
            _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(83),
            _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
               1045,
            ),
            _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1046),
            _material_ui_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1047),
            _material_ui_icons__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1048),
            _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(61),
            _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
               318,
            ),
            _utils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(98),
            _src_FirstError__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(235),
            addSourceDecorator =
               (__webpack_require__(110).withSource, __webpack_require__(110).addSource);
         __webpack_exports__.default = {
            parameters: {
               storySource: {
                  source:
                     "import * as Yup from 'yup';\nimport { ApolloForm, Field, Submit } from '../src';\nimport TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';\nimport * as React from 'react';\nimport { IUseFieldProps } from '../src/hooks/useField';\nimport { ButtonProps, Grid } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport Paper from '@material-ui/core/Paper';\nimport InputAdornment from '@material-ui/core/InputAdornment';\nimport IconButton from '@material-ui/core/IconButton';\nimport { Visibility, VisibilityOff } from '@material-ui/icons';\nimport Button from '@material-ui/core/Button';\nimport CircularProgress from '@material-ui/core/CircularProgress';\nimport { PreviewState, wait } from './utils';\nimport FirstError from '../src/FirstError';\n\nexport default {\n   title: 'Components',\n};\n\ntype SignInFormState = {\n   email: string;\n   password: string;\n};\n\nconst validationSchema = Yup.object().shape<SignInFormState>({\n   email: Yup.string()\n      .required()\n      .min(4),\n   password: Yup.string()\n      .required()\n      .min(4),\n});\n\nconst initialState: SignInFormState = {\n   email: '',\n   password: '',\n};\n\ntype FormTextFieldProps = Omit<OutlinedTextFieldProps, 'variant'> & IUseFieldProps<string>;\n\nfunction FormTextField({ name, validate, ...other }: FormTextFieldProps) {\n   return (\n      <Field<string> name={name} validate={validate}>\n         {({ field }) => {\n            const err = Boolean(!field.focused && field.touched && field.error);\n            console.log('Render: ', name);\n\n            return (\n               <TextField\n                  value={field.value}\n                  onChange={e => field.setFieldValue(e.target.value)}\n                  onFocus={() => field.setFieldFocused()}\n                  onBlur={() => field.setFieldTouched(true)}\n                  helperText={err ? field.error : undefined}\n                  error={err}\n                  variant='outlined'\n                  {...other}\n               />\n            );\n         }}\n      </Field>\n   );\n}\n\nfunction FormPassword(props: FormTextFieldProps) {\n   const [show, toggle] = React.useState(false);\n\n   return (\n      <FormTextField\n         {...props}\n         type={show ? 'text' : 'password'}\n         InputProps={{\n            endAdornment: (\n               <InputAdornment position='end'>\n                  <IconButton onClick={() => toggle(!show)}>\n                     {show ? <Visibility /> : <VisibilityOff />}\n                  </IconButton>\n               </InputAdornment>\n            ),\n            ...props.InputProps,\n         }}\n      />\n   );\n}\n\nfunction SubmitButton(props: ButtonProps) {\n   return (\n      <Submit>\n         {({ isValid, isSubmitted, loading }) =>\n            loading ? (\n               <CircularProgress />\n            ) : (\n               <Button disabled={isSubmitted ? !isValid : false} {...props} />\n            )\n         }\n      </Submit>\n   );\n}\n\nexport function SignIn() {\n   return (\n      <Grid container spacing={3}>\n         <Grid item xs={12} md={6}>\n            <Paper style={{ maxWidth: 500, padding: 20 }}>\n               <ApolloForm<SignInFormState>\n                  name='signin'\n                  initialState={initialState}\n                  removeOnUnmount\n                  validationSchema={validationSchema}\n                  onSubmit={async ({ values }, form) => {\n                     await wait(1000);\n                     console.log('Submit state: ', values);\n\n                     form.reset({ ...initialState, email: '1' });\n                  }}\n               >\n                  <Grid container spacing={2}>\n                     <Grid item xs={12}>\n                        <Typography variant='h5' align='center'>\n                           Sign in form\n                        </Typography>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FirstError showIfSubmitted/>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FormTextField\n                           name='email'\n                           type='email'\n                           label='Enter email'\n                           validate={email => {\n                              if (email && email.includes('@mail.ru')) {\n                                 return 'Please don`t use @mail.ru email';\n                              }\n                           }}\n                           fullWidth\n                        />\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FormPassword name='password' label='Enter password' fullWidth />\n                     </Grid>\n                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>\n                        <SubmitButton type='submit' variant='contained' color='primary'>\n                           Sign in\n                        </SubmitButton>\n                     </Grid>\n                  </Grid>\n               </ApolloForm>\n            </Paper>\n         </Grid>\n         <Grid item xs={12} md={6}>\n            <PreviewState name='signin' />\n         </Grid>\n      </Grid>\n   );\n}\n",
                  locationsMap: {
                     'components--sign-in': {
                        startLoc: { col: 7, line: 101 },
                        endLoc: { col: 1, line: 157 },
                        startBody: { col: 7, line: 101 },
                        endBody: { col: 1, line: 157 },
                     },
                  },
               },
            },
            title: 'Components',
         };
         var validationSchema = yup__WEBPACK_IMPORTED_MODULE_5__.c().shape({
               email: yup__WEBPACK_IMPORTED_MODULE_5__
                  .d()
                  .required()
                  .min(4),
               password: yup__WEBPACK_IMPORTED_MODULE_5__
                  .d()
                  .required()
                  .min(4),
            }),
            initialState = { email: '', password: '' };
         function FormTextField(_ref) {
            var name = _ref.name,
               validate = _ref.validate,
               other = Object(
                  _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__.a,
               )(_ref, ['name', 'validate']);
            return react__WEBPACK_IMPORTED_MODULE_8__.createElement(
               _src__WEBPACK_IMPORTED_MODULE_6__.b,
               { name: name, validate: validate },
               function(_ref2) {
                  var field = _ref2.field,
                     err = Boolean(!field.focused && field.touched && field.error);
                  return (
                     console.log('Render: ', name),
                     react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                        _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__.a,
                        Object.assign(
                           {
                              value: field.value,
                              onChange: function onChange(e) {
                                 return field.setFieldValue(e.target.value);
                              },
                              onFocus: function onFocus() {
                                 return field.setFieldFocused();
                              },
                              onBlur: function onBlur() {
                                 return field.setFieldTouched(!0);
                              },
                              helperText: err ? field.error : void 0,
                              error: err,
                              variant: 'outlined',
                           },
                           other,
                        ),
                     )
                  );
               },
            );
         }
         function FormPassword(props) {
            var _React$useState = react__WEBPACK_IMPORTED_MODULE_8__.useState(!1),
               _React$useState2 = Object(
                  _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__.a,
               )(_React$useState, 2),
               show = _React$useState2[0],
               toggle = _React$useState2[1];
            return react__WEBPACK_IMPORTED_MODULE_8__.createElement(
               FormTextField,
               Object.assign({}, props, {
                  type: show ? 'text' : 'password',
                  InputProps: Object(
                     _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_2__.a,
                  )(
                     {
                        endAdornment: react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                           _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_12__.a,
                           { position: 'end' },
                           react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                              _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_13__.a,
                              {
                                 onClick: function onClick() {
                                    return toggle(!show);
                                 },
                              },
                              show
                                 ? react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                                      _material_ui_icons__WEBPACK_IMPORTED_MODULE_14__.a,
                                      null,
                                   )
                                 : react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                                      _material_ui_icons__WEBPACK_IMPORTED_MODULE_15__.a,
                                      null,
                                   ),
                           ),
                        ),
                     },
                     props.InputProps,
                  ),
               }),
            );
         }
         function SubmitButton(props) {
            return react__WEBPACK_IMPORTED_MODULE_8__.createElement(
               _src__WEBPACK_IMPORTED_MODULE_6__.c,
               null,
               function(_ref3) {
                  var isValid = _ref3.isValid,
                     isSubmitted = _ref3.isSubmitted;
                  return _ref3.loading
                     ? react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                          _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_17__.a,
                          null,
                       )
                     : react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                          _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_16__.a,
                          Object.assign({ disabled: !!isSubmitted && !isValid }, props),
                       );
               },
            );
         }
         var SignIn = addSourceDecorator(
            function SignIn() {
               return react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                  _material_ui_core__WEBPACK_IMPORTED_MODULE_9__.a,
                  { container: !0, spacing: 3 },
                  react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                     _material_ui_core__WEBPACK_IMPORTED_MODULE_9__.a,
                     { item: !0, xs: 12, md: 6 },
                     react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                        _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_11__.a,
                        { style: { maxWidth: 500, padding: 20 } },
                        react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                           _src__WEBPACK_IMPORTED_MODULE_6__.a,
                           {
                              name: 'signin',
                              initialState: initialState,
                              removeOnUnmount: !0,
                              validationSchema: validationSchema,
                              onSubmit: (function() {
                                 var _ref5 = Object(
                                    _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__.a,
                                 )(
                                    _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(
                                       function _callee(_ref4, form) {
                                          var values;
                                          return _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(
                                             function _callee$(_context) {
                                                for (;;)
                                                   switch ((_context.prev = _context.next)) {
                                                      case 0:
                                                         return (
                                                            (values = _ref4.values),
                                                            (_context.next = 3),
                                                            Object(
                                                               _utils__WEBPACK_IMPORTED_MODULE_18__.c,
                                                            )(1e3)
                                                         );
                                                      case 3:
                                                         console.log('Submit state: ', values),
                                                            form.reset(
                                                               Object(
                                                                  _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_2__.a,
                                                               )({}, initialState, { email: '1' }),
                                                            );
                                                      case 5:
                                                      case 'end':
                                                         return _context.stop();
                                                   }
                                             },
                                             _callee,
                                          );
                                       },
                                    ),
                                 );
                                 return function(_x, _x2) {
                                    return _ref5.apply(this, arguments);
                                 };
                              })(),
                           },
                           react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                              _material_ui_core__WEBPACK_IMPORTED_MODULE_9__.a,
                              { container: !0, spacing: 2 },
                              react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                                 _material_ui_core__WEBPACK_IMPORTED_MODULE_9__.a,
                                 { item: !0, xs: 12 },
                                 react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                                    _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__.a,
                                    { variant: 'h5', align: 'center' },
                                    'Sign in form',
                                 ),
                              ),
                              react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                                 _material_ui_core__WEBPACK_IMPORTED_MODULE_9__.a,
                                 { item: !0, xs: 12 },
                                 react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                                    _src_FirstError__WEBPACK_IMPORTED_MODULE_19__.a,
                                    { showIfSubmitted: !0 },
                                 ),
                              ),
                              react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                                 _material_ui_core__WEBPACK_IMPORTED_MODULE_9__.a,
                                 { item: !0, xs: 12 },
                                 react__WEBPACK_IMPORTED_MODULE_8__.createElement(FormTextField, {
                                    name: 'email',
                                    type: 'email',
                                    label: 'Enter email',
                                    validate: function validate(email) {
                                       if (email && email.includes('@mail.ru'))
                                          return 'Please don`t use @mail.ru email';
                                    },
                                    fullWidth: !0,
                                 }),
                              ),
                              react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                                 _material_ui_core__WEBPACK_IMPORTED_MODULE_9__.a,
                                 { item: !0, xs: 12 },
                                 react__WEBPACK_IMPORTED_MODULE_8__.createElement(FormPassword, {
                                    name: 'password',
                                    label: 'Enter password',
                                    fullWidth: !0,
                                 }),
                              ),
                              react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                                 _material_ui_core__WEBPACK_IMPORTED_MODULE_9__.a,
                                 {
                                    item: !0,
                                    xs: 12,
                                    style: { display: 'flex', justifyContent: 'center' },
                                 },
                                 react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                                    SubmitButton,
                                    { type: 'submit', variant: 'contained', color: 'primary' },
                                    'Sign in',
                                 ),
                              ),
                           ),
                        ),
                     ),
                  ),
                  react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                     _material_ui_core__WEBPACK_IMPORTED_MODULE_9__.a,
                     { item: !0, xs: 12, md: 6 },
                     react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                        _utils__WEBPACK_IMPORTED_MODULE_18__.b,
                        { name: 'signin' },
                     ),
                  ),
               );
            },
            {
               __STORY__:
                  "import * as Yup from 'yup';\nimport { ApolloForm, Field, Submit } from '../src';\nimport TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';\nimport * as React from 'react';\nimport { IUseFieldProps } from '../src/hooks/useField';\nimport { ButtonProps, Grid } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport Paper from '@material-ui/core/Paper';\nimport InputAdornment from '@material-ui/core/InputAdornment';\nimport IconButton from '@material-ui/core/IconButton';\nimport { Visibility, VisibilityOff } from '@material-ui/icons';\nimport Button from '@material-ui/core/Button';\nimport CircularProgress from '@material-ui/core/CircularProgress';\nimport { PreviewState, wait } from './utils';\nimport FirstError from '../src/FirstError';\n\nexport default {\n   title: 'Components',\n};\n\ntype SignInFormState = {\n   email: string;\n   password: string;\n};\n\nconst validationSchema = Yup.object().shape<SignInFormState>({\n   email: Yup.string()\n      .required()\n      .min(4),\n   password: Yup.string()\n      .required()\n      .min(4),\n});\n\nconst initialState: SignInFormState = {\n   email: '',\n   password: '',\n};\n\ntype FormTextFieldProps = Omit<OutlinedTextFieldProps, 'variant'> & IUseFieldProps<string>;\n\nfunction FormTextField({ name, validate, ...other }: FormTextFieldProps) {\n   return (\n      <Field<string> name={name} validate={validate}>\n         {({ field }) => {\n            const err = Boolean(!field.focused && field.touched && field.error);\n            console.log('Render: ', name);\n\n            return (\n               <TextField\n                  value={field.value}\n                  onChange={e => field.setFieldValue(e.target.value)}\n                  onFocus={() => field.setFieldFocused()}\n                  onBlur={() => field.setFieldTouched(true)}\n                  helperText={err ? field.error : undefined}\n                  error={err}\n                  variant='outlined'\n                  {...other}\n               />\n            );\n         }}\n      </Field>\n   );\n}\n\nfunction FormPassword(props: FormTextFieldProps) {\n   const [show, toggle] = React.useState(false);\n\n   return (\n      <FormTextField\n         {...props}\n         type={show ? 'text' : 'password'}\n         InputProps={{\n            endAdornment: (\n               <InputAdornment position='end'>\n                  <IconButton onClick={() => toggle(!show)}>\n                     {show ? <Visibility /> : <VisibilityOff />}\n                  </IconButton>\n               </InputAdornment>\n            ),\n            ...props.InputProps,\n         }}\n      />\n   );\n}\n\nfunction SubmitButton(props: ButtonProps) {\n   return (\n      <Submit>\n         {({ isValid, isSubmitted, loading }) =>\n            loading ? (\n               <CircularProgress />\n            ) : (\n               <Button disabled={isSubmitted ? !isValid : false} {...props} />\n            )\n         }\n      </Submit>\n   );\n}\n\nexport function SignIn() {\n   return (\n      <Grid container spacing={3}>\n         <Grid item xs={12} md={6}>\n            <Paper style={{ maxWidth: 500, padding: 20 }}>\n               <ApolloForm<SignInFormState>\n                  name='signin'\n                  initialState={initialState}\n                  removeOnUnmount\n                  validationSchema={validationSchema}\n                  onSubmit={async ({ values }, form) => {\n                     await wait(1000);\n                     console.log('Submit state: ', values);\n\n                     form.reset({ ...initialState, email: '1' });\n                  }}\n               >\n                  <Grid container spacing={2}>\n                     <Grid item xs={12}>\n                        <Typography variant='h5' align='center'>\n                           Sign in form\n                        </Typography>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FirstError showIfSubmitted/>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FormTextField\n                           name='email'\n                           type='email'\n                           label='Enter email'\n                           validate={email => {\n                              if (email && email.includes('@mail.ru')) {\n                                 return 'Please don`t use @mail.ru email';\n                              }\n                           }}\n                           fullWidth\n                        />\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FormPassword name='password' label='Enter password' fullWidth />\n                     </Grid>\n                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>\n                        <SubmitButton type='submit' variant='contained' color='primary'>\n                           Sign in\n                        </SubmitButton>\n                     </Grid>\n                  </Grid>\n               </ApolloForm>\n            </Paper>\n         </Grid>\n         <Grid item xs={12} md={6}>\n            <PreviewState name='signin' />\n         </Grid>\n      </Grid>\n   );\n}\n",
               __ADDS_MAP__: {
                  'components--sign-in': {
                     startLoc: { col: 7, line: 101 },
                     endLoc: { col: 1, line: 157 },
                     startBody: { col: 7, line: 101 },
                     endBody: { col: 1, line: 157 },
                  },
               },
               __MAIN_FILE_LOCATION__: '/signin.stories.tsx',
               __MODULE_DEPENDENCIES__: [],
               __LOCAL_DEPENDENCIES__: {},
               __SOURCE_PREFIX__: '/Users/maximschiriy/Work/apollo-form/examples',
               __IDS_TO_FRAMEWORKS__: {},
            },
         );
      },
      1039: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            __webpack_require__.d(__webpack_exports__, 'TodoList', function() {
               return TodoList;
            });
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               73,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               76,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
               _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
               113,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
               75,
            ),
            yup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(49),
            _src__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(39),
            react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(0),
            _material_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(8),
            _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(100),
            _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(83),
            _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(61),
            _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
               318,
            ),
            _utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(98),
            _apollo_client__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(65),
            _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1054),
            addSourceDecorator =
               (__webpack_require__(110).withSource, __webpack_require__(110).addSource);
         __webpack_exports__.default = {
            parameters: {
               storySource: {
                  source:
                     "import * as Yup from 'yup';\nimport { ApolloForm, Field, makeApolloFormQuery, Submit, useFieldArray } from '../src';\nimport TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';\nimport * as React from 'react';\nimport { IUseFieldProps } from '../src/hooks/useField';\nimport { ButtonProps, Grid } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport Paper from '@material-ui/core/Paper';\nimport InputAdornment from '@material-ui/core/InputAdornment';\nimport IconButton from '@material-ui/core/IconButton';\nimport { Visibility, VisibilityOff } from '@material-ui/icons';\nimport Button from '@material-ui/core/Button';\nimport CircularProgress from '@material-ui/core/CircularProgress';\nimport { CodeHighlighter } from './utils';\nimport { useQuery } from '@apollo/client';\nimport Box from '@material-ui/core/Box';\nimport Chip from '@material-ui/core/Chip';\n\nexport default {\n   title: 'Components',\n};\n\ntype SignInFormState = {\n   todos: Date[];\n};\n\nconst validationSchema = Yup.object().shape<SignInFormState>({\n   todos: Yup.array()\n      .of(Yup.date().max(addDay(new Date(), 3)))\n      .required()\n      .min(2),\n});\n\nconst initialState: SignInFormState = {\n   todos: [addDay(new Date(), 1), addDay(new Date(), 2), addDay(new Date(), 3)],\n};\n\ntype FormTodoManagerProps = IUseFieldProps<Date[]>;\n\nfunction FormTodoManager({ name, validate, ...other }: FormTodoManagerProps) {\n   const field = useFieldArray({ name, validate });\n\n   return (\n      <Grid container spacing={2}>\n         {field.value.map((todo, i) => {\n            return (\n               <Grid item key={'todo-' + i}>\n                  <Chip\n                     label={todo.toLocaleDateString()}\n                     style={{ width: 150 }}\n                     onDelete={() => {\n                        field.removeAt(i);\n                     }}\n                  />\n               </Grid>\n            );\n         })}\n         <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>\n            <Button\n               onClick={() => field.push(addDay(new Date(), field.value.length + 1 || 1))}\n               variant='contained'\n               color='primary'\n            >\n               Push todo\n            </Button>\n            <Button\n               onClick={() => field.swap(0, field.value.length - 1)}\n               variant='contained'\n               color='primary'\n               disabled={field.value.length < 2}\n            >\n               Swap first and last\n            </Button>\n         </Grid>\n\n         <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>\n            <Button\n               onClick={() => field.pop()}\n               variant='contained'\n               color='secondary'\n               disabled={field.value.length < 1}\n            >\n               Delete last\n            </Button>\n            <Button\n               onClick={() => field.clear()}\n               variant='contained'\n               color='secondary'\n               disabled={field.value.length < 1}\n            >\n               Clear\n            </Button>\n         </Grid>\n      </Grid>\n   );\n}\n\nfunction SubmitButton(props: ButtonProps) {\n   return (\n      <Submit>\n         {({ isValid, isSubmitted, loading }) =>\n            loading ? (\n               <CircularProgress />\n            ) : (\n               <Button disabled={isSubmitted ? !isValid : false} {...props} />\n            )\n         }\n      </Submit>\n   );\n}\n\nexport function TodoList() {\n   return (\n      <Grid container spacing={3}>\n         <Grid item xs={12} md={6}>\n            <Paper style={{ maxWidth: 500, padding: 20 }}>\n               <ApolloForm<SignInFormState>\n                  name='todolist'\n                  initialState={initialState}\n                  validationSchema={validationSchema}\n                  onSubmit={async ({ values }, form) => {\n                     await wait(1000);\n                     console.log('Submit state: ', values);\n\n                     form.reset({\n                        todos: [],\n                     });\n                  }}\n               >\n                  <Grid container spacing={2}>\n                     <Grid item xs={12}>\n                        <Typography variant='h5' align='center'>\n                           Todo list\n                        </Typography>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FormTodoManager name='todos' />\n                     </Grid>\n                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>\n                        <SubmitButton type='submit' variant='contained' color='primary'>\n                           Save\n                        </SubmitButton>\n                     </Grid>\n                  </Grid>\n               </ApolloForm>\n            </Paper>\n         </Grid>\n         <Grid item xs={12} md={6}>\n            <PreviewState />\n         </Grid>\n      </Grid>\n   );\n}\n\nfunction PreviewState() {\n   const [query] = React.useState(makeApolloFormQuery('todolist'));\n\n   const { data } = useQuery(query);\n\n   return (\n      <Paper style={{ maxWidth: 500, padding: 20 }}>\n         {data && <CodeHighlighter>{JSON.stringify(data, null, 2)}</CodeHighlighter>}\n      </Paper>\n   );\n}\n\nfunction addDay(date: Date, days: number) {\n   return new Date(date.getTime() + 1000 * 60 * 60 * 24 * days);\n}\n\nfunction wait(time: number) {\n   return new Promise(resolve => setTimeout(resolve, time));\n}\n",
                  locationsMap: {
                     'components--todo-list': {
                        startLoc: { col: 7, line: 112 },
                        endLoc: { col: 1, line: 153 },
                        startBody: { col: 7, line: 112 },
                        endBody: { col: 1, line: 153 },
                     },
                  },
               },
            },
            title: 'Components',
         };
         var validationSchema = yup__WEBPACK_IMPORTED_MODULE_4__.c().shape({
               todos: yup__WEBPACK_IMPORTED_MODULE_4__
                  .a()
                  .of(yup__WEBPACK_IMPORTED_MODULE_4__.b().max(addDay(new Date(), 3)))
                  .required()
                  .min(2),
            }),
            initialState = {
               todos: [addDay(new Date(), 1), addDay(new Date(), 2), addDay(new Date(), 3)],
            };
         function FormTodoManager(_ref) {
            var name = _ref.name,
               validate = _ref.validate,
               field =
                  (Object(
                     _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__.a,
                  )(_ref, ['name', 'validate']),
                  Object(_src__WEBPACK_IMPORTED_MODULE_5__.e)({ name: name, validate: validate }));
            return react__WEBPACK_IMPORTED_MODULE_6__.createElement(
               _material_ui_core__WEBPACK_IMPORTED_MODULE_7__.a,
               { container: !0, spacing: 2 },
               field.value.map(function(todo, i) {
                  return react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                     _material_ui_core__WEBPACK_IMPORTED_MODULE_7__.a,
                     { item: !0, key: 'todo-' + i },
                     react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                        _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_14__.a,
                        {
                           label: todo.toLocaleDateString(),
                           style: { width: 150 },
                           onDelete: function onDelete() {
                              field.removeAt(i);
                           },
                        },
                     ),
                  );
               }),
               react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                  _material_ui_core__WEBPACK_IMPORTED_MODULE_7__.a,
                  { item: !0, xs: 12, style: { display: 'flex', justifyContent: 'space-between' } },
                  react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                     _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__.a,
                     {
                        onClick: function onClick() {
                           return field.push(addDay(new Date(), field.value.length + 1 || 1));
                        },
                        variant: 'contained',
                        color: 'primary',
                     },
                     'Push todo',
                  ),
                  react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                     _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__.a,
                     {
                        onClick: function onClick() {
                           return field.swap(0, field.value.length - 1);
                        },
                        variant: 'contained',
                        color: 'primary',
                        disabled: field.value.length < 2,
                     },
                     'Swap first and last',
                  ),
               ),
               react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                  _material_ui_core__WEBPACK_IMPORTED_MODULE_7__.a,
                  { item: !0, xs: 12, style: { display: 'flex', justifyContent: 'space-between' } },
                  react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                     _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__.a,
                     {
                        onClick: function onClick() {
                           return field.pop();
                        },
                        variant: 'contained',
                        color: 'secondary',
                        disabled: field.value.length < 1,
                     },
                     'Delete last',
                  ),
                  react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                     _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__.a,
                     {
                        onClick: function onClick() {
                           return field.clear();
                        },
                        variant: 'contained',
                        color: 'secondary',
                        disabled: field.value.length < 1,
                     },
                     'Clear',
                  ),
               ),
            );
         }
         function SubmitButton(props) {
            return react__WEBPACK_IMPORTED_MODULE_6__.createElement(
               _src__WEBPACK_IMPORTED_MODULE_5__.c,
               null,
               function(_ref2) {
                  var isValid = _ref2.isValid,
                     isSubmitted = _ref2.isSubmitted;
                  return _ref2.loading
                     ? react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                          _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_11__.a,
                          null,
                       )
                     : react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                          _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__.a,
                          Object.assign({ disabled: !!isSubmitted && !isValid }, props),
                       );
               },
            );
         }
         var TodoList = addSourceDecorator(
            function TodoList() {
               return react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                  _material_ui_core__WEBPACK_IMPORTED_MODULE_7__.a,
                  { container: !0, spacing: 3 },
                  react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                     _material_ui_core__WEBPACK_IMPORTED_MODULE_7__.a,
                     { item: !0, xs: 12, md: 6 },
                     react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                        _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9__.a,
                        { style: { maxWidth: 500, padding: 20 } },
                        react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                           _src__WEBPACK_IMPORTED_MODULE_5__.a,
                           {
                              name: 'todolist',
                              initialState: initialState,
                              validationSchema: validationSchema,
                              onSubmit: (function() {
                                 var _ref4 = Object(
                                    _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__.a,
                                 )(
                                    _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(
                                       function _callee(_ref3, form) {
                                          var values;
                                          return _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(
                                             function _callee$(_context) {
                                                for (;;)
                                                   switch ((_context.prev = _context.next)) {
                                                      case 0:
                                                         return (
                                                            (values = _ref3.values),
                                                            (_context.next = 3),
                                                            wait(1e3)
                                                         );
                                                      case 3:
                                                         console.log('Submit state: ', values),
                                                            form.reset({ todos: [] });
                                                      case 5:
                                                      case 'end':
                                                         return _context.stop();
                                                   }
                                             },
                                             _callee,
                                          );
                                       },
                                    ),
                                 );
                                 return function(_x, _x2) {
                                    return _ref4.apply(this, arguments);
                                 };
                              })(),
                           },
                           react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                              _material_ui_core__WEBPACK_IMPORTED_MODULE_7__.a,
                              { container: !0, spacing: 2 },
                              react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                                 _material_ui_core__WEBPACK_IMPORTED_MODULE_7__.a,
                                 { item: !0, xs: 12 },
                                 react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                                    _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__.a,
                                    { variant: 'h5', align: 'center' },
                                    'Todo list',
                                 ),
                              ),
                              react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                                 _material_ui_core__WEBPACK_IMPORTED_MODULE_7__.a,
                                 { item: !0, xs: 12 },
                                 react__WEBPACK_IMPORTED_MODULE_6__.createElement(FormTodoManager, {
                                    name: 'todos',
                                 }),
                              ),
                              react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                                 _material_ui_core__WEBPACK_IMPORTED_MODULE_7__.a,
                                 {
                                    item: !0,
                                    xs: 12,
                                    style: { display: 'flex', justifyContent: 'center' },
                                 },
                                 react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                                    SubmitButton,
                                    { type: 'submit', variant: 'contained', color: 'primary' },
                                    'Save',
                                 ),
                              ),
                           ),
                        ),
                     ),
                  ),
                  react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                     _material_ui_core__WEBPACK_IMPORTED_MODULE_7__.a,
                     { item: !0, xs: 12, md: 6 },
                     react__WEBPACK_IMPORTED_MODULE_6__.createElement(PreviewState, null),
                  ),
               );
            },
            {
               __STORY__:
                  "import * as Yup from 'yup';\nimport { ApolloForm, Field, makeApolloFormQuery, Submit, useFieldArray } from '../src';\nimport TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';\nimport * as React from 'react';\nimport { IUseFieldProps } from '../src/hooks/useField';\nimport { ButtonProps, Grid } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport Paper from '@material-ui/core/Paper';\nimport InputAdornment from '@material-ui/core/InputAdornment';\nimport IconButton from '@material-ui/core/IconButton';\nimport { Visibility, VisibilityOff } from '@material-ui/icons';\nimport Button from '@material-ui/core/Button';\nimport CircularProgress from '@material-ui/core/CircularProgress';\nimport { CodeHighlighter } from './utils';\nimport { useQuery } from '@apollo/client';\nimport Box from '@material-ui/core/Box';\nimport Chip from '@material-ui/core/Chip';\n\nexport default {\n   title: 'Components',\n};\n\ntype SignInFormState = {\n   todos: Date[];\n};\n\nconst validationSchema = Yup.object().shape<SignInFormState>({\n   todos: Yup.array()\n      .of(Yup.date().max(addDay(new Date(), 3)))\n      .required()\n      .min(2),\n});\n\nconst initialState: SignInFormState = {\n   todos: [addDay(new Date(), 1), addDay(new Date(), 2), addDay(new Date(), 3)],\n};\n\ntype FormTodoManagerProps = IUseFieldProps<Date[]>;\n\nfunction FormTodoManager({ name, validate, ...other }: FormTodoManagerProps) {\n   const field = useFieldArray({ name, validate });\n\n   return (\n      <Grid container spacing={2}>\n         {field.value.map((todo, i) => {\n            return (\n               <Grid item key={'todo-' + i}>\n                  <Chip\n                     label={todo.toLocaleDateString()}\n                     style={{ width: 150 }}\n                     onDelete={() => {\n                        field.removeAt(i);\n                     }}\n                  />\n               </Grid>\n            );\n         })}\n         <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>\n            <Button\n               onClick={() => field.push(addDay(new Date(), field.value.length + 1 || 1))}\n               variant='contained'\n               color='primary'\n            >\n               Push todo\n            </Button>\n            <Button\n               onClick={() => field.swap(0, field.value.length - 1)}\n               variant='contained'\n               color='primary'\n               disabled={field.value.length < 2}\n            >\n               Swap first and last\n            </Button>\n         </Grid>\n\n         <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>\n            <Button\n               onClick={() => field.pop()}\n               variant='contained'\n               color='secondary'\n               disabled={field.value.length < 1}\n            >\n               Delete last\n            </Button>\n            <Button\n               onClick={() => field.clear()}\n               variant='contained'\n               color='secondary'\n               disabled={field.value.length < 1}\n            >\n               Clear\n            </Button>\n         </Grid>\n      </Grid>\n   );\n}\n\nfunction SubmitButton(props: ButtonProps) {\n   return (\n      <Submit>\n         {({ isValid, isSubmitted, loading }) =>\n            loading ? (\n               <CircularProgress />\n            ) : (\n               <Button disabled={isSubmitted ? !isValid : false} {...props} />\n            )\n         }\n      </Submit>\n   );\n}\n\nexport function TodoList() {\n   return (\n      <Grid container spacing={3}>\n         <Grid item xs={12} md={6}>\n            <Paper style={{ maxWidth: 500, padding: 20 }}>\n               <ApolloForm<SignInFormState>\n                  name='todolist'\n                  initialState={initialState}\n                  validationSchema={validationSchema}\n                  onSubmit={async ({ values }, form) => {\n                     await wait(1000);\n                     console.log('Submit state: ', values);\n\n                     form.reset({\n                        todos: [],\n                     });\n                  }}\n               >\n                  <Grid container spacing={2}>\n                     <Grid item xs={12}>\n                        <Typography variant='h5' align='center'>\n                           Todo list\n                        </Typography>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FormTodoManager name='todos' />\n                     </Grid>\n                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>\n                        <SubmitButton type='submit' variant='contained' color='primary'>\n                           Save\n                        </SubmitButton>\n                     </Grid>\n                  </Grid>\n               </ApolloForm>\n            </Paper>\n         </Grid>\n         <Grid item xs={12} md={6}>\n            <PreviewState />\n         </Grid>\n      </Grid>\n   );\n}\n\nfunction PreviewState() {\n   const [query] = React.useState(makeApolloFormQuery('todolist'));\n\n   const { data } = useQuery(query);\n\n   return (\n      <Paper style={{ maxWidth: 500, padding: 20 }}>\n         {data && <CodeHighlighter>{JSON.stringify(data, null, 2)}</CodeHighlighter>}\n      </Paper>\n   );\n}\n\nfunction addDay(date: Date, days: number) {\n   return new Date(date.getTime() + 1000 * 60 * 60 * 24 * days);\n}\n\nfunction wait(time: number) {\n   return new Promise(resolve => setTimeout(resolve, time));\n}\n",
               __ADDS_MAP__: {
                  'components--todo-list': {
                     startLoc: { col: 7, line: 112 },
                     endLoc: { col: 1, line: 153 },
                     startBody: { col: 7, line: 112 },
                     endBody: { col: 1, line: 153 },
                  },
               },
               __MAIN_FILE_LOCATION__: '/todo-list.stories.tsx',
               __MODULE_DEPENDENCIES__: [],
               __LOCAL_DEPENDENCIES__: {},
               __SOURCE_PREFIX__: '/Users/maximschiriy/Work/apollo-form/examples',
               __IDS_TO_FRAMEWORKS__: {},
            },
         );
         function PreviewState() {
            var _React$useState = react__WEBPACK_IMPORTED_MODULE_6__.useState(
                  Object(_src__WEBPACK_IMPORTED_MODULE_5__.d)('todolist'),
               ),
               query = Object(
                  _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a,
               )(_React$useState, 1)[0],
               data = Object(_apollo_client__WEBPACK_IMPORTED_MODULE_13__.useQuery)(query).data;
            return react__WEBPACK_IMPORTED_MODULE_6__.createElement(
               _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9__.a,
               { style: { maxWidth: 500, padding: 20 } },
               data &&
                  react__WEBPACK_IMPORTED_MODULE_6__.createElement(
                     _utils__WEBPACK_IMPORTED_MODULE_12__.a,
                     null,
                     JSON.stringify(data, null, 2),
                  ),
            );
         }
         function addDay(date, days) {
            return new Date(date.getTime() + 864e5 * days);
         }
         function wait(time) {
            return new Promise(function(resolve) {
               return setTimeout(resolve, time);
            });
         }
      },
      1040: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            __webpack_require__.d(__webpack_exports__, 'WithConfirm', function() {
               return WithConfirm;
            });
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               76,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               113,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
               73,
            ),
            _src__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(39),
            react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0),
            _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8),
            _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(100),
            _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(83),
            _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(61),
            _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
               318,
            ),
            _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(98),
            _apollo_client__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(65),
            _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1053),
            _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1051),
            _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
               1050,
            ),
            _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1049),
            addSourceDecorator =
               (__webpack_require__(110).withSource, __webpack_require__(110).addSource);
         __webpack_exports__.default = {
            parameters: {
               storySource: {
                  source:
                     "import { ApolloForm, makeApolloFormQuery, Submit } from '../src';\nimport * as React from 'react';\nimport { ButtonProps, Grid } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport Paper from '@material-ui/core/Paper';\nimport Button from '@material-ui/core/Button';\nimport CircularProgress from '@material-ui/core/CircularProgress';\nimport { CodeHighlighter } from './utils';\nimport { useQuery } from '@apollo/client';\nimport Dialog from '@material-ui/core/Dialog';\nimport Box from '@material-ui/core/Box';\nimport DialogActions from '@material-ui/core/DialogActions';\nimport DialogTitle from '@material-ui/core/DialogTitle';\n\nexport default {\n   title: 'Components',\n};\n\ntype WithConfirmFormState = {\n   test: string;\n};\n\nconst initialState: WithConfirmFormState = {\n   test: '',\n};\n\nfunction SubmitConfirm(props: ButtonProps) {\n   const [openConfirm, toggleConfirm] = React.useState(false);\n\n   const onClose = () => toggleConfirm(false);\n\n   return (\n      <Submit>\n         {({ isValid, isSubmitted, loading, form }) => (\n            <>\n               <Button\n                  disabled={isSubmitted ? !isValid : false}\n                  onClick={() => toggleConfirm(true)}\n                  {...props}\n               />\n               <Dialog maxWidth='xs' fullWidth open={openConfirm} onClose={onClose}>\n                  <DialogTitle>Confirm title</DialogTitle>\n                  <DialogActions>\n                     {loading ? (\n                        <CircularProgress />\n                     ) : (\n                        <Box display='flex'>\n                           <Button onClick={onClose} variant='contained'>\n                              Decline\n                           </Button>\n                           <Button\n                              style={{ marginLeft: 16 }}\n                              variant='contained'\n                              color='primary'\n                              onClick={() => {\n                                 form.submit().then(() => {\n                                    onClose();\n                                 });\n                              }}\n                           >\n                              Accept\n                           </Button>\n                        </Box>\n                     )}\n                  </DialogActions>\n               </Dialog>\n            </>\n         )}\n      </Submit>\n   );\n}\n\nexport function WithConfirm() {\n   return (\n      <Grid container spacing={3}>\n         <Grid item xs={12} md={6}>\n            <Paper style={{ maxWidth: 500, padding: 20 }}>\n               <ApolloForm<WithConfirmFormState>\n                  name='withConfirm'\n                  initialState={initialState}\n                  onSubmit={async ({ values }, form) => {\n                     await wait(1000);\n                     console.log('Submit state: ', values);\n                  }}\n               >\n                  <Grid container spacing={2}>\n                     <Grid item xs={12}>\n                        <Typography variant='h5' align='center'>\n                           Example confirm\n                        </Typography>\n                     </Grid>\n                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>\n                        <SubmitConfirm variant='contained' color='primary'>\n                           Submit (with confirm)\n                        </SubmitConfirm>\n                     </Grid>\n                  </Grid>\n               </ApolloForm>\n            </Paper>\n         </Grid>\n         <Grid item xs={12} md={6}>\n            <PreviewState />\n         </Grid>\n      </Grid>\n   );\n}\n\nconst query = makeApolloFormQuery('withConfirm');\n\nfunction PreviewState() {\n   const { data } = useQuery(query);\n\n   return (\n      <Paper style={{ maxWidth: 500, padding: 20 }}>\n         {data && <CodeHighlighter>{JSON.stringify(data, null, 2)}</CodeHighlighter>}\n      </Paper>\n   );\n}\n\nfunction wait(time: number) {\n   return new Promise(resolve => setTimeout(resolve, time));\n}\n",
                  locationsMap: {
                     'components--with-confirm': {
                        startLoc: { col: 7, line: 73 },
                        endLoc: { col: 1, line: 106 },
                        startBody: { col: 7, line: 73 },
                        endBody: { col: 1, line: 106 },
                     },
                  },
               },
            },
            title: 'Components',
         };
         var initialState = { test: '' };
         function SubmitConfirm(props) {
            var _React$useState = react__WEBPACK_IMPORTED_MODULE_4__.useState(!1),
               _React$useState2 = Object(
                  _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.a,
               )(_React$useState, 2),
               openConfirm = _React$useState2[0],
               toggleConfirm = _React$useState2[1],
               onClose = function onClose() {
                  return toggleConfirm(!1);
               };
            return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
               _src__WEBPACK_IMPORTED_MODULE_3__.c,
               null,
               function(_ref) {
                  var isValid = _ref.isValid,
                     isSubmitted = _ref.isSubmitted,
                     loading = _ref.loading,
                     form = _ref.form;
                  return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                     react__WEBPACK_IMPORTED_MODULE_4__.Fragment,
                     null,
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__.a,
                        Object.assign(
                           {
                              disabled: !!isSubmitted && !isValid,
                              onClick: function onClick() {
                                 return toggleConfirm(!0);
                              },
                           },
                           props,
                        ),
                     ),
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_12__.a,
                        { maxWidth: 'xs', fullWidth: !0, open: openConfirm, onClose: onClose },
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_15__.a,
                           null,
                           'Confirm title',
                        ),
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_14__.a,
                           null,
                           loading
                              ? react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                   _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_9__.a,
                                   null,
                                )
                              : react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                   _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_13__.a,
                                   { display: 'flex' },
                                   react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                      _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__.a,
                                      { onClick: onClose, variant: 'contained' },
                                      'Decline',
                                   ),
                                   react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                      _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__.a,
                                      {
                                         style: { marginLeft: 16 },
                                         variant: 'contained',
                                         color: 'primary',
                                         onClick: function onClick() {
                                            form.submit().then(function() {
                                               onClose();
                                            });
                                         },
                                      },
                                      'Accept',
                                   ),
                                ),
                        ),
                     ),
                  );
               },
            );
         }
         var WithConfirm = addSourceDecorator(
               function WithConfirm() {
                  return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                     _material_ui_core__WEBPACK_IMPORTED_MODULE_5__.a,
                     { container: !0, spacing: 3 },
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _material_ui_core__WEBPACK_IMPORTED_MODULE_5__.a,
                        { item: !0, xs: 12, md: 6 },
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_7__.a,
                           { style: { maxWidth: 500, padding: 20 } },
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              _src__WEBPACK_IMPORTED_MODULE_3__.a,
                              {
                                 name: 'withConfirm',
                                 initialState: initialState,
                                 onSubmit: (function() {
                                    var _ref3 = Object(
                                       _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__.a,
                                    )(
                                       _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(
                                          function _callee(_ref2, form) {
                                             var values;
                                             return _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(
                                                function _callee$(_context) {
                                                   for (;;)
                                                      switch ((_context.prev = _context.next)) {
                                                         case 0:
                                                            return (
                                                               (values = _ref2.values),
                                                               (_context.next = 3),
                                                               wait(1e3)
                                                            );
                                                         case 3:
                                                            console.log('Submit state: ', values);
                                                         case 4:
                                                         case 'end':
                                                            return _context.stop();
                                                      }
                                                },
                                                _callee,
                                             );
                                          },
                                       ),
                                    );
                                    return function(_x, _x2) {
                                       return _ref3.apply(this, arguments);
                                    };
                                 })(),
                              },
                              react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                 _material_ui_core__WEBPACK_IMPORTED_MODULE_5__.a,
                                 { container: !0, spacing: 2 },
                                 react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                    _material_ui_core__WEBPACK_IMPORTED_MODULE_5__.a,
                                    { item: !0, xs: 12 },
                                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                       _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__.a,
                                       { variant: 'h5', align: 'center' },
                                       'Example confirm',
                                    ),
                                 ),
                                 react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                    _material_ui_core__WEBPACK_IMPORTED_MODULE_5__.a,
                                    {
                                       item: !0,
                                       xs: 12,
                                       style: { display: 'flex', justifyContent: 'center' },
                                    },
                                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                       SubmitConfirm,
                                       { variant: 'contained', color: 'primary' },
                                       'Submit (with confirm)',
                                    ),
                                 ),
                              ),
                           ),
                        ),
                     ),
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _material_ui_core__WEBPACK_IMPORTED_MODULE_5__.a,
                        { item: !0, xs: 12, md: 6 },
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(PreviewState, null),
                     ),
                  );
               },
               {
                  __STORY__:
                     "import { ApolloForm, makeApolloFormQuery, Submit } from '../src';\nimport * as React from 'react';\nimport { ButtonProps, Grid } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport Paper from '@material-ui/core/Paper';\nimport Button from '@material-ui/core/Button';\nimport CircularProgress from '@material-ui/core/CircularProgress';\nimport { CodeHighlighter } from './utils';\nimport { useQuery } from '@apollo/client';\nimport Dialog from '@material-ui/core/Dialog';\nimport Box from '@material-ui/core/Box';\nimport DialogActions from '@material-ui/core/DialogActions';\nimport DialogTitle from '@material-ui/core/DialogTitle';\n\nexport default {\n   title: 'Components',\n};\n\ntype WithConfirmFormState = {\n   test: string;\n};\n\nconst initialState: WithConfirmFormState = {\n   test: '',\n};\n\nfunction SubmitConfirm(props: ButtonProps) {\n   const [openConfirm, toggleConfirm] = React.useState(false);\n\n   const onClose = () => toggleConfirm(false);\n\n   return (\n      <Submit>\n         {({ isValid, isSubmitted, loading, form }) => (\n            <>\n               <Button\n                  disabled={isSubmitted ? !isValid : false}\n                  onClick={() => toggleConfirm(true)}\n                  {...props}\n               />\n               <Dialog maxWidth='xs' fullWidth open={openConfirm} onClose={onClose}>\n                  <DialogTitle>Confirm title</DialogTitle>\n                  <DialogActions>\n                     {loading ? (\n                        <CircularProgress />\n                     ) : (\n                        <Box display='flex'>\n                           <Button onClick={onClose} variant='contained'>\n                              Decline\n                           </Button>\n                           <Button\n                              style={{ marginLeft: 16 }}\n                              variant='contained'\n                              color='primary'\n                              onClick={() => {\n                                 form.submit().then(() => {\n                                    onClose();\n                                 });\n                              }}\n                           >\n                              Accept\n                           </Button>\n                        </Box>\n                     )}\n                  </DialogActions>\n               </Dialog>\n            </>\n         )}\n      </Submit>\n   );\n}\n\nexport function WithConfirm() {\n   return (\n      <Grid container spacing={3}>\n         <Grid item xs={12} md={6}>\n            <Paper style={{ maxWidth: 500, padding: 20 }}>\n               <ApolloForm<WithConfirmFormState>\n                  name='withConfirm'\n                  initialState={initialState}\n                  onSubmit={async ({ values }, form) => {\n                     await wait(1000);\n                     console.log('Submit state: ', values);\n                  }}\n               >\n                  <Grid container spacing={2}>\n                     <Grid item xs={12}>\n                        <Typography variant='h5' align='center'>\n                           Example confirm\n                        </Typography>\n                     </Grid>\n                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>\n                        <SubmitConfirm variant='contained' color='primary'>\n                           Submit (with confirm)\n                        </SubmitConfirm>\n                     </Grid>\n                  </Grid>\n               </ApolloForm>\n            </Paper>\n         </Grid>\n         <Grid item xs={12} md={6}>\n            <PreviewState />\n         </Grid>\n      </Grid>\n   );\n}\n\nconst query = makeApolloFormQuery('withConfirm');\n\nfunction PreviewState() {\n   const { data } = useQuery(query);\n\n   return (\n      <Paper style={{ maxWidth: 500, padding: 20 }}>\n         {data && <CodeHighlighter>{JSON.stringify(data, null, 2)}</CodeHighlighter>}\n      </Paper>\n   );\n}\n\nfunction wait(time: number) {\n   return new Promise(resolve => setTimeout(resolve, time));\n}\n",
                  __ADDS_MAP__: {
                     'components--with-confirm': {
                        startLoc: { col: 7, line: 73 },
                        endLoc: { col: 1, line: 106 },
                        startBody: { col: 7, line: 73 },
                        endBody: { col: 1, line: 106 },
                     },
                  },
                  __MAIN_FILE_LOCATION__: '/with-confirm.stories.tsx',
                  __MODULE_DEPENDENCIES__: [],
                  __LOCAL_DEPENDENCIES__: {},
                  __SOURCE_PREFIX__: '/Users/maximschiriy/Work/apollo-form/examples',
                  __IDS_TO_FRAMEWORKS__: {},
               },
            ),
            query = Object(_src__WEBPACK_IMPORTED_MODULE_3__.d)('withConfirm');
         function PreviewState() {
            var data = Object(_apollo_client__WEBPACK_IMPORTED_MODULE_11__.useQuery)(query).data;
            return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
               _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_7__.a,
               { style: { maxWidth: 500, padding: 20 } },
               data &&
                  react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                     _utils__WEBPACK_IMPORTED_MODULE_10__.a,
                     null,
                     JSON.stringify(data, null, 2),
                  ),
            );
         }
         function wait(time) {
            return new Promise(function(resolve) {
               return setTimeout(resolve, time);
            });
         }
      },
      112: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
         __webpack_exports__.a = function useField(props) {
            var apolloForm = Object(_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__.a)(),
               value = apolloForm.useValue(props.name),
               error = apolloForm.useError(props.name),
               touched = apolloForm.useTouched(props.name),
               focused = apolloForm.useState(
                  function(s) {
                     return s.focused === props.name;
                  },
                  [props.name],
               ),
               setFieldValue = react__WEBPACK_IMPORTED_MODULE_0___default.a.useCallback(
                  function(v) {
                     apolloForm.setFieldValue(props.name, v);
                  },
                  [apolloForm],
               ),
               setFieldError = react__WEBPACK_IMPORTED_MODULE_0___default.a.useCallback(
                  function(v) {
                     apolloForm.setFieldError(props.name, v);
                  },
                  [apolloForm],
               ),
               setFieldTouched = react__WEBPACK_IMPORTED_MODULE_0___default.a.useCallback(
                  function(v) {
                     apolloForm.setFieldTouched(props.name, v);
                  },
                  [apolloForm],
               ),
               setFieldFocused = react__WEBPACK_IMPORTED_MODULE_0___default.a.useCallback(
                  function() {
                     apolloForm.setFieldFocused(props.name);
                  },
                  [apolloForm],
               );
            return (
               react__WEBPACK_IMPORTED_MODULE_0___default.a.useEffect(
                  function() {
                     if (props.validate)
                        return (
                           apolloForm.addFieldValidator(props.name, props.validate),
                           function() {
                              return apolloForm.removeFieldValidator(props.name);
                           }
                        );
                  },
                  [apolloForm],
               ),
               {
                  value: value,
                  error: error,
                  touched: touched,
                  focused: focused,
                  setFieldValue: setFieldValue,
                  setFieldError: setFieldError,
                  setFieldTouched: setFieldTouched,
                  setFieldFocused: setFieldFocused,
               }
            );
         };
      },
      141: function(module, exports) {},
      142: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            FormContext = __webpack_require__
               .n(react__WEBPACK_IMPORTED_MODULE_0__)
               .a.createContext({});
         __webpack_exports__.a = FormContext;
      },
      143: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               36,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               120,
            ),
            _useField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(112);
         __webpack_exports__.a = function useFieldArray(props) {
            var field = Object(_useField__WEBPACK_IMPORTED_MODULE_2__.a)({
               name: props.name,
               validate: props.validate,
            });
            return (
               Array.isArray(field.value) || console.error(props.name + ' is not array'),
               Object(
                  _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a,
               )({}, field, {
                  push: function push() {
                     for (
                        var _len = arguments.length, args = new Array(_len), _key = 0;
                        _key < _len;
                        _key++
                     )
                        args[_key] = arguments[_key];
                     field.setFieldValue(
                        [].concat(
                           Object(
                              _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__.a,
                           )(field.value),
                           args,
                        ),
                     );
                  },
                  removeAt: function removeAt(index) {
                     var newArr = Object(
                        _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__.a,
                     )(field.value);
                     newArr.splice(index, 1), field.setFieldValue(newArr);
                  },
                  insertAt: function insertAt(index) {
                     for (
                        var newArr = Object(
                              _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__.a,
                           )(field.value),
                           _len2 = arguments.length,
                           args = new Array(_len2 > 1 ? _len2 - 1 : 0),
                           _key2 = 1;
                        _key2 < _len2;
                        _key2++
                     )
                        args[_key2 - 1] = arguments[_key2];
                     newArr.splice.apply(newArr, [index, 0].concat(args)),
                        field.setFieldValue(newArr);
                  },
                  pop: function pop() {
                     var newArr = Object(
                        _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__.a,
                     )(field.value);
                     newArr.pop(), field.setFieldValue(newArr);
                  },
                  swap: function swap(index1, index2) {
                     var newArr = Object(
                           _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__.a,
                        )(field.value),
                        _ref = [newArr[index2], newArr[index1]];
                     (newArr[index1] = _ref[0]),
                        (newArr[index2] = _ref[1]),
                        field.setFieldValue(newArr);
                  },
                  clear: function clear() {
                     field.setFieldValue([]);
                  },
               })
            );
         };
      },
      146: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
         __webpack_exports__.a = function ErrorMessage(props) {
            var apolloForm = Object(_hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__.a)(),
               error = apolloForm.useError(props.name),
               touched = apolloForm.useTouched(props.name),
               Component =
                  props.children ||
                  function(_ref) {
                     var error = _ref.error;
                     return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        'span',
                        null,
                        error,
                     );
                  };
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, {
               error: (props.ignoreTouched || touched) && error,
            });
         };
      },
      184: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
         __webpack_exports__.a = function FormConsumer(_ref) {
            var Render = _ref.children,
               form = Object(_hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__.a)();
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Render, {
               form: form,
            });
         };
      },
      229: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               457,
            ),
            _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(65);
         function _templateObject() {
            var data = Object(
               _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__.a,
            )(['query ApolloForm { ', ' @client }']);
            return (
               (_templateObject = function _templateObject() {
                  return data;
               }),
               data
            );
         }
         __webpack_exports__.a = function makeApolloFormQuery(name) {
            return Object(_apollo_client__WEBPACK_IMPORTED_MODULE_1__.gql)(_templateObject(), name);
         };
      },
      233: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               75,
            ),
            _hooks_useFieldArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(143),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32);
         __webpack_exports__.a = function FieldArray(props) {
            var children = props.children,
               fieldArrProps = Object(
                  _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__.a,
               )(props, ['children']),
               form = Object(_hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_2__.a)();
            return children({
               field: Object(_hooks_useFieldArray__WEBPACK_IMPORTED_MODULE_1__.a)(fieldArrProps),
               form: form,
            });
         };
      },
      234: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);
         __webpack_exports__.a = function Submit(props) {
            var Component = props.children,
               apolloForm = Object(_hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__.a)(),
               _apolloForm$useState = apolloForm.useState(function(s) {
                  return {
                     isValid: s.isValid,
                     loading: s.loading,
                     existsChanges: s.existsChanges,
                     isSubmitted: s.isSubmitted,
                  };
               }),
               isValid = _apolloForm$useState.isValid,
               existsChanges = _apolloForm$useState.existsChanges,
               loading = _apolloForm$useState.loading,
               isSubmitted = _apolloForm$useState.isSubmitted;
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, {
               disabled: !isValid || loading || !existsChanges,
               isValid: isValid,
               loading: loading,
               existsChanges: existsChanges,
               isSubmitted: isSubmitted,
               form: apolloForm,
            });
         };
      },
      235: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32),
            _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(58);
         __webpack_exports__.a = function FirstError(props) {
            var apolloForm = Object(_hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__.a)(),
               submitted = apolloForm.useState(function(s) {
                  return s.isSubmitted;
               }),
               errors = apolloForm.useState(function(s) {
                  return s.errors;
               }),
               Component =
                  props.children ||
                  function(_ref) {
                     var error = _ref.error;
                     return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                        'span',
                        null,
                        error,
                     );
                  };
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, {
               error:
                  !props.showIfSubmitted || submitted
                     ? Object(_utils__WEBPACK_IMPORTED_MODULE_2__.a)(errors)
                     : void 0,
            });
         };
      },
      32: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            _FormContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(142);
         __webpack_exports__.a = function useApolloFormCtx() {
            return Object(react__WEBPACK_IMPORTED_MODULE_0__.useContext)(
               _FormContext__WEBPACK_IMPORTED_MODULE_1__.a,
            );
         };
      },
      39: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__(184);
         var react = __webpack_require__(0),
            react_default = __webpack_require__.n(react),
            useApolloFormCtx = __webpack_require__(32);
         var objectWithoutProperties = __webpack_require__(75),
            useField = __webpack_require__(112);
         var field_Field = function Field(props) {
            var children = props.children,
               fieldProps = Object(objectWithoutProperties.a)(props, ['children']),
               form = Object(useApolloFormCtx.a)();
            return children({ field: Object(useField.a)(fieldProps), form: form });
         };
         __webpack_require__(233);
         var useFieldArray = __webpack_require__(143);
         var objectSpread2 = __webpack_require__(36),
            toConsumableArray = __webpack_require__(120),
            slicedToArray = __webpack_require__(73),
            defineProperty = __webpack_require__(240),
            classCallCheck = __webpack_require__(241),
            createClass = __webpack_require__(242),
            cloneDeep = __webpack_require__(118),
            cloneDeep_default = __webpack_require__.n(cloneDeep),
            isEqual = __webpack_require__(111),
            isEqual_default = __webpack_require__.n(isEqual),
            utils = __webpack_require__(58),
            createForOfIteratorHelper = __webpack_require__(458),
            merge = __webpack_require__(459),
            merge_default = __webpack_require__.n(merge),
            lodash_get = __webpack_require__(129),
            get_default = __webpack_require__.n(lodash_get),
            lodash_set = __webpack_require__(460),
            set_default = __webpack_require__.n(lodash_set),
            src_FormManipulator = (function() {
               function FormManipulator(props) {
                  Object(classCallCheck.a)(this, FormManipulator),
                     (this.validateHandler = void 0),
                     (this.validationSchema = void 0),
                     (this.customValidators = void 0),
                     (this.initialState = void 0),
                     (this.initialErrors = void 0),
                     (this.initialTouches = void 0),
                     (this.validateOnMount = void 0),
                     (this.defaultState = void 0),
                     (this.validateHandler = props.validate),
                     (this.validationSchema = props.validationSchema),
                     (this.customValidators = props.customValidators),
                     (this.initialState = props.initialState),
                     (this.initialErrors = props.initialErrors),
                     (this.initialTouches = props.initialTouches),
                     (this.validateOnMount = props.validateOnMount),
                     (this.defaultState = props.defaultState);
               }
               return (
                  Object(createClass.a)(FormManipulator, [
                     {
                        key: 'setValue',
                        value: function setValue(state, key, newValue) {
                           var value = get_default()(state.values, key);
                           return (
                              isEqual_default()(value, newValue) ||
                                 set_default()(state.values, key, newValue),
                              state.existsChanges || (state.existsChanges = !0),
                              state
                           );
                        },
                     },
                     {
                        key: 'setError',
                        value: function setError(state, key, value) {
                           return (
                              Object(utils.b)(state.errors, key) !== value &&
                                 Object(utils.e)(state.errors, key, value),
                              state
                           );
                        },
                     },
                     {
                        key: 'setTouched',
                        value: function setTouched(state, key, value) {
                           return (
                              Object(utils.b)(state.touches, key) !== value &&
                                 Object(utils.e)(state.touches, key, value),
                              state
                           );
                        },
                     },
                     {
                        key: 'getValue',
                        value: function getValue(state, key) {
                           return get_default()(state.values, key);
                        },
                     },
                     {
                        key: 'getError',
                        value: function getError(state, key) {
                           return Object(utils.b)(cloneDeep_default()(state.errors), key);
                        },
                     },
                     {
                        key: 'getTouched',
                        value: function getTouched(state, key) {
                           return Object(utils.b)(cloneDeep_default()(state.touches), key);
                        },
                     },
                     {
                        key: 'validate',
                        value: function validate(state) {
                           var allTouched =
                              arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                           if (((state.errors = {}), this.validateHandler)) {
                              var customErrors = this.validateHandler(state);
                              merge_default()(state.errors, customErrors);
                           }
                           for (var _key in this.customValidators)
                              if (!(_key in state.errors)) {
                                 var value = get_default()(state.values, _key),
                                    newError = this.customValidators[_key](value);
                                 newError && this.setError(state, _key, newError);
                              }
                           if (this.validationSchema)
                              try {
                                 this.validationSchema.validateSync(state.values, {
                                    recursive: !0,
                                    abortEarly: !1,
                                 });
                              } catch (e) {
                                 var _step,
                                    _iterator = Object(createForOfIteratorHelper.a)(e.inner);
                                 try {
                                    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                                       var err = _step.value,
                                          path = err.path.replace('[', '.').replace(']', '');
                                       this.getError(state, path) ||
                                          this.setError(state, path, err.message);
                                    }
                                 } catch (err) {
                                    _iterator.e(err);
                                 } finally {
                                    _iterator.f();
                                 }
                              }
                           allTouched && Object(utils.d)(state.touches, state.values, !0);
                           var nextIsValid = !Object(utils.a)(state.errors);
                           return (state.isValid = nextIsValid), state;
                        },
                     },
                     {
                        key: 'reset',
                        value: function reset(state, getState) {
                           return (
                              getState
                                 ? 'function' == typeof getState
                                    ? Object.assign(
                                         state,
                                         Object(objectSpread2.a)({}, this.defaultState, {
                                            values: getState(state.values),
                                            errors: this.initialErrors,
                                            touches: this.initialTouches,
                                         }),
                                      )
                                    : Object.assign(
                                         state,
                                         Object(objectSpread2.a)({}, this.defaultState, {
                                            values: getState,
                                            errors: this.initialErrors,
                                            touches: this.initialTouches,
                                         }),
                                      )
                                 : Object.assign(
                                      state,
                                      Object(objectSpread2.a)({}, this.defaultState, {
                                         values: this.initialState,
                                         errors: this.initialErrors,
                                         touches: this.initialTouches,
                                      }),
                                   ),
                              state
                           );
                        },
                     },
                  ]),
                  FormManipulator
               );
            })(),
            defaultState = {
               errors: {},
               touches: {},
               isValid: !0,
               loading: !1,
               existsChanges: !1,
               isSubmitted: !1,
               focused: null,
            },
            src_FormManager = (function() {
               function FormManager(props) {
                  Object(classCallCheck.a)(this, FormManager),
                     (this.name = void 0),
                     (this.manipulator = void 0),
                     (this.customValidators = {}),
                     (this.apolloClient = void 0),
                     (this.validateHandler = void 0),
                     (this.validationSchema = void 0),
                     (this.onSubmit = void 0),
                     (this.onChange = void 0),
                     (this.resetOnSubmit = void 0),
                     (this.validateOnMount = void 0),
                     (this.initialState = void 0),
                     (this.initialErrors = void 0),
                     (this.initialTouches = void 0),
                     (this.query = void 0),
                     (this.apolloClient = props.apolloClient),
                     (this.name = props.name),
                     (this.validateHandler = props.validate),
                     (this.query = this.getQuery()),
                     (this.onChange = props.onChange),
                     (this.onSubmit = props.onSubmit),
                     (this.validationSchema = props.validationSchema),
                     (this.validateOnMount = props.validateOnMount),
                     (this.resetOnSubmit = props.resetOnSubmit),
                     (this.initialState = cloneDeep_default()(props.initialState)),
                     (this.initialErrors = cloneDeep_default()(props.initialErrors) || {}),
                     (this.initialTouches = cloneDeep_default()(props.initialTouches) || {}),
                     (this.manipulator = new src_FormManipulator(
                        Object(objectSpread2.a)({}, props, {
                           defaultState: defaultState,
                           initialTouches: this.initialTouches,
                           initialErrors: this.initialErrors,
                           customValidators: this.customValidators,
                        }),
                     )),
                     this.get(),
                     this.validate(this.validateOnMount);
               }
               return (
                  Object(createClass.a)(FormManager, [
                     {
                        key: 'set',
                        value: function set(state) {
                           this.apolloClient.writeQuery({
                              query: this.query,
                              data: Object(defineProperty.a)({}, this.name, state),
                           });
                        },
                     },
                     {
                        key: 'get',
                        value: function get() {
                           var data;
                           try {
                              data = this.apolloClient.readQuery({ query: this.query });
                           } catch (e) {}
                           return (
                              data ||
                                 (this.set(
                                    Object(objectSpread2.a)({}, defaultState, {
                                       values: this.initialState,
                                       errors: this.initialErrors,
                                       touches: this.initialTouches,
                                    }),
                                 ),
                                 (data = this.apolloClient.readQuery({ query: this.query }))),
                              cloneDeep_default()(data[this.name])
                           );
                        },
                     },
                     {
                        key: 'exists',
                        value: function exists() {
                           try {
                              var data = this.apolloClient.readQuery({ query: this.query });
                              return Boolean(data);
                           } catch (e) {
                              return !1;
                           }
                        },
                     },
                     {
                        key: 'useState',
                        value: function useState() {
                           var _this = this,
                              selector =
                                 arguments.length > 0 && void 0 !== arguments[0]
                                    ? arguments[0]
                                    : function(s) {
                                         return s;
                                      },
                              dependencies =
                                 arguments.length > 1 && void 0 !== arguments[1]
                                    ? arguments[1]
                                    : [],
                              _React$useState = react_default.a.useState(
                                 selector ? selector(this.get()) : this.get(),
                              ),
                              _React$useState2 = Object(slicedToArray.a)(_React$useState, 2),
                              state = _React$useState2[0],
                              setState = _React$useState2[1];
                           return (
                              react_default.a.useEffect(function() {
                                 return _this.watch(selector, function(s) {
                                    return setState(s);
                                 });
                              }, [setState, this.apolloClient, this.query, this.name].concat(
                                 Object(toConsumableArray.a)(dependencies),
                              )),
                              state
                           );
                        },
                     },
                     {
                        key: 'watch',
                        value: function watch(selector, handler) {
                           var _this2 = this,
                              previous = selector ? selector(this.get()) : this.get();
                           return this.apolloClient.cache.watch({
                              query: this.query,
                              callback: function callback(_ref) {
                                 var s = _ref.result[_this2.name],
                                    v = selector ? selector(s) : s;
                                 isEqual_default()(previous, v) || ((previous = v), handler(v));
                              },
                              optimistic: !1,
                           });
                        },
                     },
                     {
                        key: 'useValue',
                        value: function useValue(key) {
                           var _this3 = this;
                           return this.useState(function(state) {
                              return _this3.manipulator.getValue(state, key);
                           });
                        },
                     },
                     {
                        key: 'useTouched',
                        value: function useTouched(key) {
                           var _this4 = this;
                           return this.useState(function(state) {
                              return _this4.manipulator.getTouched(state, key);
                           });
                        },
                     },
                     {
                        key: 'useError',
                        value: function useError(key) {
                           var _this5 = this;
                           return this.useState(function(state) {
                              return _this5.manipulator.getError(state, key);
                           });
                        },
                     },
                     {
                        key: 'setValues',
                        value: function setValues(values) {
                           this.set(Object(objectSpread2.a)({}, this.get(), { values: values })),
                              this.onChange && this.onChange(values, this);
                        },
                     },
                     {
                        key: 'setErrors',
                        value: function setErrors(errors) {
                           return this.set(
                              Object(objectSpread2.a)({}, this.get(), { errors: errors }),
                           );
                        },
                     },
                     {
                        key: 'setTouches',
                        value: function setTouches(touches) {
                           return this.set(
                              Object(objectSpread2.a)({}, this.get(), { touches: touches }),
                           );
                        },
                     },
                     {
                        key: 'setFieldValue',
                        value: function setFieldValue(key, newValue) {
                           var state = this.get();
                           return (
                              Object(utils.b)(state.touches, key) ||
                                 this.manipulator.setTouched(state, key, !0),
                              this.manipulator.setValue(state, key, newValue),
                              this.manipulator.validate(state, !1),
                              this.set(state),
                              this.onChange && this.onChange(state.values, this),
                              state
                           );
                        },
                     },
                     {
                        key: 'setFieldError',
                        value: function setFieldError(key, error) {
                           var state = this.get();
                           this.manipulator.setError(state, key, error);
                           var nextIsValid = !Boolean(Object(utils.a)(state.errors));
                           return (state.isValid = nextIsValid), this.set(state);
                        },
                     },
                     {
                        key: 'setFieldTouched',
                        value: function setFieldTouched(key, value) {
                           var state = this.get();
                           return (
                              this.manipulator.setTouched(state, key, value),
                              (state.focused = null),
                              this.set(state)
                           );
                        },
                     },
                     {
                        key: 'setFieldFocused',
                        value: function setFieldFocused(key) {
                           var state = this.get();
                           return (state.focused = key), this.set(state);
                        },
                     },
                     {
                        key: 'setIsValid',
                        value: function setIsValid(value) {
                           var state = this.get();
                           return (state.isValid = value), this.set(state);
                        },
                     },
                     {
                        key: 'setIsSubmitted',
                        value: function setIsSubmitted(value) {
                           var state = this.get();
                           return (state.isSubmitted = value), this.set(state);
                        },
                     },
                     {
                        key: 'setExistsChanges',
                        value: function setExistsChanges(value) {
                           var state = this.get();
                           return (state.existsChanges = value), this.set(state);
                        },
                     },
                     {
                        key: 'setLoading',
                        value: function setLoading(value) {
                           var state = this.get();
                           return (state.loading = value), this.set(state);
                        },
                     },
                     {
                        key: 'validate',
                        value: function validate(allTouched) {
                           var state = this.get();
                           this.manipulator.validate(state, allTouched), this.set(state);
                        },
                     },
                     {
                        key: 'addFieldValidator',
                        value: function addFieldValidator(key, func) {
                           this.customValidators[key] || (this.customValidators[key] = func);
                        },
                     },
                     {
                        key: 'removeFieldValidator',
                        value: function removeFieldValidator(key) {
                           delete this.customValidators[key];
                        },
                     },
                     {
                        key: 'submit',
                        value: function submit() {
                           var _this6 = this,
                              state = this.get();
                           return (
                              this.manipulator.validate(state, !0),
                              (state.isSubmitted = !0),
                              this.onSubmit && state.isValid
                                 ? ((state.loading = !0),
                                   this.set(state),
                                   this.onSubmit(state, this)
                                      .then(function(s) {
                                         var state2 = _this6.get();
                                         return (
                                            _this6.resetOnSubmit &&
                                               _this6.manipulator.reset(state2),
                                            (state2.loading = !1),
                                            _this6.set(state2),
                                            s
                                         );
                                      })
                                      .catch(function(err) {
                                         var state2 = _this6.get();
                                         return (state2.loading = !1), _this6.set(state2), err;
                                      }))
                                 : (this.set(state), Promise.resolve())
                           );
                        },
                     },
                     {
                        key: 'reset',
                        value: function reset(getState) {
                           var state = this.get();
                           this.manipulator.reset(state, getState),
                              this.manipulator.validate(state, this.validateOnMount),
                              (state.isSubmitted = !1),
                              (state.existsChanges = !1),
                              this.set(state);
                        },
                     },
                     {
                        key: 'getQuery',
                        value: function getQuery() {
                           return Object(utils.c)(this.name);
                        },
                     },
                     {
                        key: 'getInitialState',
                        value: function getInitialState() {
                           return this.initialState;
                        },
                     },
                  ]),
                  FormManager
               );
            })(),
            client = __webpack_require__(65);
         var hooks_useApolloForm = function useApolloForm(_ref) {
            var resetOnUnmount = _ref.resetOnUnmount,
               removeOnUnmount = _ref.removeOnUnmount,
               enableReinitialize = _ref.enableReinitialize,
               initialState = _ref.initialState,
               props = Object(objectWithoutProperties.a)(_ref, [
                  'resetOnUnmount',
                  'removeOnUnmount',
                  'enableReinitialize',
                  'initialState',
               ]),
               mountedRef = react_default.a.useRef(!1),
               apolloClient = Object(client.useApolloClient)(),
               manager = react_default.a.useRef(
                  new src_FormManager(
                     Object(objectSpread2.a)({}, props, {
                        initialState: initialState,
                        apolloClient: apolloClient,
                     }),
                  ),
               ).current;
            return (
               react_default.a.useEffect(
                  function() {
                     enableReinitialize &&
                        mountedRef.current &&
                        setTimeout(function() {
                           manager.exists() &&
                              (isEqual_default()(manager.getInitialState(), initialState) ||
                                 manager.reset(initialState));
                        }),
                        (mountedRef.current = !0);
                  },
                  [initialState, mountedRef, enableReinitialize],
               ),
               react_default.a.useEffect(
                  function() {
                     return function() {
                        removeOnUnmount
                           ? setTimeout(function() {
                                apolloClient.cache.evict({
                                   id: 'ROOT_QUERY',
                                   fieldName: manager.name,
                                });
                             }, 100)
                           : resetOnUnmount &&
                             setTimeout(function() {
                                manager.exists() && manager.reset();
                             }, 100);
                     };
                  },
                  [resetOnUnmount, removeOnUnmount, manager],
               ),
               manager
            );
         };
         __webpack_require__(146);
         var Submit = __webpack_require__(234),
            FormContext = (__webpack_require__(235), __webpack_require__(142));
         var src_ApolloForm = function ApolloForm(_ref) {
               var children = _ref.children,
                  id = _ref.id,
                  style = _ref.style,
                  className = _ref.className,
                  params = Object(objectWithoutProperties.a)(_ref, [
                     'children',
                     'id',
                     'style',
                     'className',
                  ]),
                  manager = hooks_useApolloForm(params);
               return react_default.a.createElement(
                  FormContext.a.Provider,
                  { value: manager },
                  react_default.a.createElement(
                     'form',
                     {
                        id: id,
                        onSubmit: function onSubmit(e) {
                           e.preventDefault(), e.stopPropagation(), manager.submit().then();
                        },
                        style: style,
                        className: className,
                     },
                     children,
                  ),
               );
            },
            query = __webpack_require__(229);
         __webpack_require__(141);
         __webpack_require__.d(__webpack_exports__, 'a', function() {
            return src_ApolloForm;
         }),
            __webpack_require__.d(__webpack_exports__, 'e', function() {
               return useFieldArray.a;
            }),
            __webpack_require__.d(__webpack_exports__, 'b', function() {
               return field_Field;
            }),
            __webpack_require__.d(__webpack_exports__, 'c', function() {
               return Submit.a;
            }),
            __webpack_require__.d(__webpack_exports__, 'd', function() {
               return query.a;
            });
      },
      482: function(module, exports, __webpack_require__) {
         __webpack_require__(483),
            __webpack_require__(629),
            __webpack_require__(630),
            (module.exports = __webpack_require__(811));
      },
      547: function(module, exports) {},
      58: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.d(__webpack_exports__, 'd', function() {
            return replaceValues;
         }),
            __webpack_require__.d(__webpack_exports__, 'b', function() {
               return getDeepStatus;
            }),
            __webpack_require__.d(__webpack_exports__, 'e', function() {
               return setDeepStatus;
            }),
            __webpack_require__.d(__webpack_exports__, 'a', function() {
               return firstError;
            });
         var lodash_isDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(317),
            lodash_isDate__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               lodash_isDate__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(229);
         function replaceValues(target, source, value) {
            for (var _i = 0, _Object$keys = Object.keys(source); _i < _Object$keys.length; _i++) {
               var key = _Object$keys[_i];
               if (
                  'object' != typeof source[key] ||
                  null === source[key] ||
                  lodash_isDate__WEBPACK_IMPORTED_MODULE_0___default()(value)
               )
                  target[key] = value;
               else if (Array.isArray(source[key]))
                  for (var k in (target[key] || (target[key] = []),
                  (target[key][0] = !0),
                  target[key][1] || (target[key][1] = {}),
                  source[key]))
                     target[key][1][k] = !0;
               else
                  target[key] || (target[key] = {}), replaceValues(target[key], source[key], value);
            }
            return source;
         }
         function firstError(state) {
            for (var k in state)
               return 'object' != typeof state[k] ||
                  lodash_isDate__WEBPACK_IMPORTED_MODULE_0___default()(state[k])
                  ? state[k]
                  : firstError(state[k]);
         }
         function getDeepStatus(state, path, withDefault) {
            for (
               var arr = path.split('.'), last = arr[arr.length - 1], current = state, i = 0;
               i < arr.length - 1;
               i++
            ) {
               var key = arr[i];
               void 0 === current[key] &&
                  (i === arr.length - 1 ? (current[key] = {}) : (current[key] = [void 0, {}])),
                  'object' == typeof current[key]
                     ? (current = Array.isArray(current[key]) ? current[key][1] : current[key])
                     : (current[key] = [current[key], {}]);
            }
            if (void 0 !== current)
               return (
                  void 0 === current[last] && withDefault && (current[last] = void 0),
                  'object' == typeof current[last]
                     ? Array.isArray(current[last])
                        ? current[last][0]
                        : void (current[last] = [void 0, current[last]])
                     : current[last]
               );
         }
         function setDeepStatus(state, path, value) {
            for (
               var arr = path.split('.'), last = arr[arr.length - 1], current = state, i = 0;
               i < arr.length - 1;
               i++
            ) {
               var key = arr[i];
               if (
                  (void 0 === current[key] &&
                     (i === arr.length - 1 ? (current[key] = {}) : (current[key] = [void 0, {}])),
                  'object' == typeof current[key])
               )
                  current = Array.isArray(current[key]) ? current[key][1] : current[key];
               else {
                  var t = current[key];
                  (current[key] = [t, {}]), (current = current[key][1]);
               }
            }
            return (
               'object' == typeof current[last]
                  ? Array.isArray(current[last])
                     ? (current[last][0] = value)
                     : (current[last] = [value, current[last]])
                  : (current[last] = value),
               state
            );
         }
         __webpack_require__.d(__webpack_exports__, 'c', function() {
            return _query__WEBPACK_IMPORTED_MODULE_1__.a;
         });
      },
      630: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__);
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _storybook_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(149),
            _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(454),
            _apollo_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(65),
            _apollo_client_cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(82);
         Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__.addParameters)({
            options: { showRoots: !0 },
            dependencies: { withStoriesOnly: !0, hideEmpty: !0 },
         }),
            Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__.addDecorator)(
               _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__.withKnobs,
            );
         var client = new _apollo_client__WEBPACK_IMPORTED_MODULE_3__.ApolloClient({
            ssrMode: !1,
            connectToDevTools: !0,
            cache: new _apollo_client_cache__WEBPACK_IMPORTED_MODULE_4__.InMemoryCache().restore(
               {},
            ),
            resolvers: {},
            credentials: 'same-origin',
         });
         (window._APOLLO_ = client),
            Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__.addDecorator)(function(story) {
               return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                  _apollo_client__WEBPACK_IMPORTED_MODULE_3__.ApolloProvider,
                  { client: client },
                  story(),
               );
            });
      },
      811: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            function(module) {
               var _storybook_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(149);
               (module._StorybookPreserveDecorators = !0),
                  Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)(
                     [__webpack_require__(812)],
                     module,
                  );
            }.call(this, __webpack_require__(182)(module));
      },
      812: function(module, exports, __webpack_require__) {
         var map = {
            './example.stories.tsx': 813,
            './signin.stories.tsx': 1038,
            './todo-list.stories.tsx': 1039,
            './with-confirm.stories.tsx': 1040,
         };
         function webpackContext(req) {
            var id = webpackContextResolve(req);
            return __webpack_require__(id);
         }
         function webpackContextResolve(req) {
            if (!__webpack_require__.o(map, req)) {
               var e = new Error("Cannot find module '" + req + "'");
               throw ((e.code = 'MODULE_NOT_FOUND'), e);
            }
            return map[req];
         }
         (webpackContext.keys = function webpackContextKeys() {
            return Object.keys(map);
         }),
            (webpackContext.resolve = webpackContextResolve),
            (module.exports = webpackContext),
            (webpackContext.id = 812);
      },
      813: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            __webpack_require__.d(__webpack_exports__, 'Example', function() {
               return Example;
            });
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               76,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               36,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
               113,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
               73,
            ),
            react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0),
            _src__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(39),
            yup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(49),
            _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(471),
            _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8),
            _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(61),
            _src_utils_ErrorMessage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(146),
            _src_utils_Submit__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(234),
            _src_consumers_FormConsumer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(184),
            _src_field_FieldArray__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(233),
            _material_ui_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(83),
            _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(100),
            _utils__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(98),
            addSourceDecorator =
               (__webpack_require__(110).withSource, __webpack_require__(110).addSource);
         __webpack_exports__.default = {
            parameters: {
               storySource: {
                  source:
                     "import * as React from 'react';\nimport { ApolloForm, Field, FieldValidator } from '../src';\nimport * as Yup from 'yup';\nimport TextField from '@material-ui/core/TextField';\nimport Grid from '@material-ui/core/Grid';\nimport Button from '@material-ui/core/Button';\nimport ErrorMessage from '../src/utils/ErrorMessage';\nimport Submit from '../src/utils/Submit';\nimport FormConsumer from '../src/consumers/FormConsumer';\nimport FieldArray from '../src/field/FieldArray';\nimport { Paper } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport { PreviewState } from './utils';\n\nexport default {\n   title: 'Components',\n};\n\nconst validationSchema = Yup.object().shape({\n   email: Yup.string()\n      .required()\n      .max(5),\n   password: Yup.string()\n      .required()\n      .max(3),\n   deep: Yup.object().shape({\n      one: Yup.string()\n         .required()\n         .max(2),\n   }),\n   arr: Yup.array()\n      .of(\n         Yup.string()\n            .required()\n            .max(3),\n      )\n      .min(3)\n      .test('arr', 'Not length equal 2 words', arr => {\n         return !(arr.filter((el: string) => el.length === 2).length > 0);\n      }),\n});\n\nfunction FormTextField(props: { name: string; validate?: FieldValidator<string>; label: string }) {\n   return (\n      <Field<string> name={props.name} validate={props.validate}>\n         {({ field }) => {\n            const err = Boolean(field.touched && field.error);\n            // console.log('render ' + props.name);\n\n            return (\n               <TextField\n                  value={field.value}\n                  onChange={e => field.setFieldValue(e.target.value)}\n                  onBlur={() => field.setFieldTouched(true)}\n                  helperText={err ? field.error : undefined}\n                  error={Boolean(field.touched && field.error)}\n                  label={props.label}\n               />\n            );\n         }}\n      </Field>\n   );\n}\n\nfunction FormTextFieldArray(props: { name: string; validate: FieldValidator<string[]> }) {\n   return (\n      <Paper style={{ padding: 24 }}>\n         <Grid container spacing={2}>\n            <Grid item xs={12}>\n               <Typography>Example deep array fields</Typography>\n            </Grid>\n            <FieldArray<string> name={props.name} validate={props.validate}>\n               {({ field }) => {\n                  return (\n                     <>\n                        {field.value.map((el, i) => {\n                           return (\n                              <Grid item xs={3} key={'arr-field' + i}>\n                                 <FormTextField\n                                    key={'test' + i}\n                                    name={props.name + '.' + i}\n                                    label={props.name + '.' + i}\n                                 />\n                              </Grid>\n                           );\n                        })}\n\n                        <Grid item xs={3} style={{ display: 'flex', alignItems: 'flex-end' }}>\n                           <Button\n                              variant='contained'\n                              onClick={() => field.push((field.value.length + 1).toString())}\n                           >\n                              push\n                           </Button>\n                           <Button\n                              variant='contained'\n                              onClick={() => field.pop()}\n                              style={{ marginLeft: 16 }}\n                           >\n                              pop\n                           </Button>\n                        </Grid>\n                     </>\n                  );\n               }}\n            </FieldArray>\n         </Grid>\n      </Paper>\n   );\n}\n\nexport function Example() {\n   const [initialState, setState] = React.useState({\n      email: '1',\n      password: '',\n      deep: { one: '1', two: { test: '2' } },\n      arr: ['', '2', '31'],\n   });\n\n   return (\n      <ApolloForm\n         name='example'\n         initialState={initialState}\n         validationSchema={validationSchema}\n         validate={({ values }) => {\n            if (values.email === '12') {\n               return {\n                  email: 'Not 12',\n               };\n            }\n\n            return undefined;\n         }}\n         onSubmit={async ({ values }, form) => {\n            await wait(1000);\n            console.log('submit', values);\n            form.reset({\n               ...values,\n               email: 'Reseted',\n            });\n         }}\n         onChange={(state, form) => console.log('Values: ', state)}\n      >\n         <Grid container spacing={2}>\n            <Grid item xs={8}>\n               <Grid container spacing={2}>\n                  <Grid item xs={12}>\n                     <Paper style={{ padding: 24 }}>\n                        <Grid container spacing={2}>\n                           <Grid item xs={12}>\n                              <Typography>Example basic fields</Typography>\n                           </Grid>\n                           <Grid item xs={6}>\n                              <FormTextField\n                                 name='email'\n                                 label='email'\n                                 validate={v => {\n                                    if (v.length === 1) {\n                                       return 'custom error';\n                                    }\n                                 }}\n                              />\n                           </Grid>\n                           <Grid item xs={6}>\n                              <FormTextField name='password' label='password' />\n                           </Grid>\n                        </Grid>\n                     </Paper>\n                  </Grid>\n                  <Grid item xs={12}>\n                     <Paper style={{ padding: 24 }}>\n                        <Grid container spacing={2}>\n                           <Grid item xs={12}>\n                              <Typography>Example deep object fields</Typography>\n                           </Grid>\n                           <Grid item xs={6}>\n                              <FormTextField name='deep.one' label='deep.one' />\n                           </Grid>\n                           <Grid item xs={6}>\n                              <FormTextField name='deep.two.test' label='deep.two.test' />\n                           </Grid>\n                        </Grid>\n                     </Paper>\n                  </Grid>\n                  <Grid item xs={12}>\n                     <FormTextFieldArray\n                        name='arr'\n                        validate={arr => {\n                           if (arr.filter(el => el.length === 0).length !== 0) {\n                              return 'not empty in arr';\n                           }\n                        }}\n                     />\n                  </Grid>\n                  <Grid item xs={12}>\n                     <Paper style={{ padding: 24 }}>\n                        <Grid container spacing={2}>\n                           <Grid item xs={12}>\n                              <Typography>Example actions</Typography>\n                           </Grid>\n                           <Grid item>\n                              <FormConsumer>\n                                 {({ form }) => (\n                                    <Button variant='contained' onClick={() => form.reset()}>\n                                       RESET\n                                    </Button>\n                                 )}\n                              </FormConsumer>\n                           </Grid>\n                           <Grid item>\n                              <FormConsumer>\n                                 {({ form }) => (\n                                    <Button variant='contained' onClick={() => form.validate(true)}>\n                                       VALIDATE\n                                    </Button>\n                                 )}\n                              </FormConsumer>\n                           </Grid>\n                           <Grid item>\n                              <Submit>\n                                 {({ isValid, isSubmitted, loading }) => (\n                                    <Button\n                                       variant='contained'\n                                       type='submit'\n                                       disabled={loading || (isSubmitted ? !isValid : false)}\n                                    >\n                                       Submit\n                                    </Button>\n                                 )}\n                              </Submit>\n                           </Grid>\n                        </Grid>\n                     </Paper>\n                  </Grid>\n                  <Grid item xs={12}>\n                     <Paper style={{ padding: 24 }}>\n                        <Grid container spacing={2}>\n                           <Grid item xs={3}>\n                              <ErrorMessage\n                                 name='password'\n                                 children={({ error }) => (\n                                    <span>\n                                       password error: (<b style={{ color: 'red' }}>{error}</b>)\n                                    </span>\n                                 )}\n                              />\n                           </Grid>\n                           <Grid item xs={3}>\n                              <ErrorMessage\n                                 name='arr'\n                                 children={({ error }) => (\n                                    <span>\n                                       arr error: (<b style={{ color: 'red' }}>{error}</b>)\n                                    </span>\n                                 )}\n                              />\n                           </Grid>\n                           <Grid item xs={3}>\n                              <ErrorMessage\n                                 name='arr.0'\n                                 children={({ error }) => (\n                                    <span>\n                                       arr.0 error: (<b style={{ color: 'red' }}>{error}</b>)\n                                    </span>\n                                 )}\n                              />\n                           </Grid>\n                        </Grid>\n                     </Paper>\n                  </Grid>\n               </Grid>\n            </Grid>\n            <Grid item xs={4}>\n               <PreviewState name='example' />\n            </Grid>\n         </Grid>\n      </ApolloForm>\n   );\n}\n\nfunction wait(time: number) {\n   return new Promise(resolve => setTimeout(resolve, time));\n}\n",
                  locationsMap: {
                     'components--example': {
                        startLoc: { col: 7, line: 112 },
                        endLoc: { col: 1, line: 279 },
                        startBody: { col: 7, line: 112 },
                        endBody: { col: 1, line: 279 },
                     },
                  },
               },
            },
            title: 'Components',
         };
         var validationSchema = yup__WEBPACK_IMPORTED_MODULE_6__.c().shape({
            email: yup__WEBPACK_IMPORTED_MODULE_6__
               .d()
               .required()
               .max(5),
            password: yup__WEBPACK_IMPORTED_MODULE_6__
               .d()
               .required()
               .max(3),
            deep: yup__WEBPACK_IMPORTED_MODULE_6__.c().shape({
               one: yup__WEBPACK_IMPORTED_MODULE_6__
                  .d()
                  .required()
                  .max(2),
            }),
            arr: yup__WEBPACK_IMPORTED_MODULE_6__
               .a()
               .of(
                  yup__WEBPACK_IMPORTED_MODULE_6__
                     .d()
                     .required()
                     .max(3),
               )
               .min(3)
               .test('arr', 'Not length equal 2 words', function(arr) {
                  return !(
                     arr.filter(function(el) {
                        return 2 === el.length;
                     }).length > 0
                  );
               }),
         });
         function FormTextField(props) {
            return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
               _src__WEBPACK_IMPORTED_MODULE_5__.b,
               { name: props.name, validate: props.validate },
               function(_ref) {
                  var field = _ref.field,
                     err = Boolean(field.touched && field.error);
                  return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                     _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__.a,
                     {
                        value: field.value,
                        onChange: function onChange(e) {
                           return field.setFieldValue(e.target.value);
                        },
                        onBlur: function onBlur() {
                           return field.setFieldTouched(!0);
                        },
                        helperText: err ? field.error : void 0,
                        error: Boolean(field.touched && field.error),
                        label: props.label,
                     },
                  );
               },
            );
         }
         function FormTextFieldArray(props) {
            return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
               _material_ui_core__WEBPACK_IMPORTED_MODULE_14__.a,
               { style: { padding: 24 } },
               react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                  _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                  { container: !0, spacing: 2 },
                  react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                     _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                     { item: !0, xs: 12 },
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15__.a,
                        null,
                        'Example deep array fields',
                     ),
                  ),
                  react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                     _src_field_FieldArray__WEBPACK_IMPORTED_MODULE_13__.a,
                     { name: props.name, validate: props.validate },
                     function(_ref2) {
                        var field = _ref2.field;
                        return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           react__WEBPACK_IMPORTED_MODULE_4__.Fragment,
                           null,
                           field.value.map(function(el, i) {
                              return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                 _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                 { item: !0, xs: 3, key: 'arr-field' + i },
                                 react__WEBPACK_IMPORTED_MODULE_4__.createElement(FormTextField, {
                                    key: 'test' + i,
                                    name: props.name + '.' + i,
                                    label: props.name + '.' + i,
                                 }),
                              );
                           }),
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                              {
                                 item: !0,
                                 xs: 3,
                                 style: { display: 'flex', alignItems: 'flex-end' },
                              },
                              react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                 _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_9__.a,
                                 {
                                    variant: 'contained',
                                    onClick: function onClick() {
                                       return field.push((field.value.length + 1).toString());
                                    },
                                 },
                                 'push',
                              ),
                              react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                 _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_9__.a,
                                 {
                                    variant: 'contained',
                                    onClick: function onClick() {
                                       return field.pop();
                                    },
                                    style: { marginLeft: 16 },
                                 },
                                 'pop',
                              ),
                           ),
                        );
                     },
                  ),
               ),
            );
         }
         var Example = addSourceDecorator(
            function Example() {
               var _React$useState = react__WEBPACK_IMPORTED_MODULE_4__.useState({
                     email: '1',
                     password: '',
                     deep: { one: '1', two: { test: '2' } },
                     arr: ['', '2', '31'],
                  }),
                  _React$useState2 = Object(
                     _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__.a,
                  )(_React$useState, 2),
                  initialState = _React$useState2[0];
               _React$useState2[1];
               return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                  _src__WEBPACK_IMPORTED_MODULE_5__.a,
                  {
                     name: 'example',
                     initialState: initialState,
                     validationSchema: validationSchema,
                     validate: function validate(_ref3) {
                        if ('12' === _ref3.values.email) return { email: 'Not 12' };
                     },
                     onSubmit: (function() {
                        var _ref5 = Object(
                           _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__.a,
                        )(
                           _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(
                              function _callee(_ref4, form) {
                                 var values;
                                 return _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(
                                    function _callee$(_context) {
                                       for (;;)
                                          switch ((_context.prev = _context.next)) {
                                             case 0:
                                                return (
                                                   (values = _ref4.values),
                                                   (_context.next = 3),
                                                   wait(1e3)
                                                );
                                             case 3:
                                                console.log('submit', values),
                                                   form.reset(
                                                      Object(
                                                         _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__.a,
                                                      )({}, values, { email: 'Reseted' }),
                                                   );
                                             case 5:
                                             case 'end':
                                                return _context.stop();
                                          }
                                    },
                                    _callee,
                                 );
                              },
                           ),
                        );
                        return function(_x, _x2) {
                           return _ref5.apply(this, arguments);
                        };
                     })(),
                     onChange: function onChange(state, form) {
                        return console.log('Values: ', state);
                     },
                  },
                  react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                     _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                     { container: !0, spacing: 2 },
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                        { item: !0, xs: 8 },
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                           { container: !0, spacing: 2 },
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                              { item: !0, xs: 12 },
                              react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                 _material_ui_core__WEBPACK_IMPORTED_MODULE_14__.a,
                                 { style: { padding: 24 } },
                                 react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                    _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                    { container: !0, spacing: 2 },
                                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                       _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                       { item: !0, xs: 12 },
                                       react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                          _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15__.a,
                                          null,
                                          'Example basic fields',
                                       ),
                                    ),
                                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                       _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                       { item: !0, xs: 6 },
                                       react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                          FormTextField,
                                          {
                                             name: 'email',
                                             label: 'email',
                                             validate: function validate(v) {
                                                if (1 === v.length) return 'custom error';
                                             },
                                          },
                                       ),
                                    ),
                                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                       _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                       { item: !0, xs: 6 },
                                       react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                          FormTextField,
                                          { name: 'password', label: 'password' },
                                       ),
                                    ),
                                 ),
                              ),
                           ),
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                              { item: !0, xs: 12 },
                              react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                 _material_ui_core__WEBPACK_IMPORTED_MODULE_14__.a,
                                 { style: { padding: 24 } },
                                 react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                    _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                    { container: !0, spacing: 2 },
                                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                       _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                       { item: !0, xs: 12 },
                                       react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                          _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15__.a,
                                          null,
                                          'Example deep object fields',
                                       ),
                                    ),
                                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                       _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                       { item: !0, xs: 6 },
                                       react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                          FormTextField,
                                          { name: 'deep.one', label: 'deep.one' },
                                       ),
                                    ),
                                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                       _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                       { item: !0, xs: 6 },
                                       react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                          FormTextField,
                                          { name: 'deep.two.test', label: 'deep.two.test' },
                                       ),
                                    ),
                                 ),
                              ),
                           ),
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                              { item: !0, xs: 12 },
                              react__WEBPACK_IMPORTED_MODULE_4__.createElement(FormTextFieldArray, {
                                 name: 'arr',
                                 validate: function validate(arr) {
                                    if (
                                       0 !==
                                       arr.filter(function(el) {
                                          return 0 === el.length;
                                       }).length
                                    )
                                       return 'not empty in arr';
                                 },
                              }),
                           ),
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                              { item: !0, xs: 12 },
                              react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                 _material_ui_core__WEBPACK_IMPORTED_MODULE_14__.a,
                                 { style: { padding: 24 } },
                                 react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                    _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                    { container: !0, spacing: 2 },
                                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                       _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                       { item: !0, xs: 12 },
                                       react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                          _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15__.a,
                                          null,
                                          'Example actions',
                                       ),
                                    ),
                                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                       _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                       { item: !0 },
                                       react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                          _src_consumers_FormConsumer__WEBPACK_IMPORTED_MODULE_12__.a,
                                          null,
                                          function(_ref6) {
                                             var form = _ref6.form;
                                             return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                                _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_9__.a,
                                                {
                                                   variant: 'contained',
                                                   onClick: function onClick() {
                                                      return form.reset();
                                                   },
                                                },
                                                'RESET',
                                             );
                                          },
                                       ),
                                    ),
                                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                       _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                       { item: !0 },
                                       react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                          _src_consumers_FormConsumer__WEBPACK_IMPORTED_MODULE_12__.a,
                                          null,
                                          function(_ref7) {
                                             var form = _ref7.form;
                                             return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                                _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_9__.a,
                                                {
                                                   variant: 'contained',
                                                   onClick: function onClick() {
                                                      return form.validate(!0);
                                                   },
                                                },
                                                'VALIDATE',
                                             );
                                          },
                                       ),
                                    ),
                                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                       _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                       { item: !0 },
                                       react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                          _src_utils_Submit__WEBPACK_IMPORTED_MODULE_11__.a,
                                          null,
                                          function(_ref8) {
                                             var isValid = _ref8.isValid,
                                                isSubmitted = _ref8.isSubmitted,
                                                loading = _ref8.loading;
                                             return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                                _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_9__.a,
                                                {
                                                   variant: 'contained',
                                                   type: 'submit',
                                                   disabled: loading || (!!isSubmitted && !isValid),
                                                },
                                                'Submit',
                                             );
                                          },
                                       ),
                                    ),
                                 ),
                              ),
                           ),
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                              { item: !0, xs: 12 },
                              react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                 _material_ui_core__WEBPACK_IMPORTED_MODULE_14__.a,
                                 { style: { padding: 24 } },
                                 react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                    _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                    { container: !0, spacing: 2 },
                                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                       _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                       { item: !0, xs: 3 },
                                       react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                          _src_utils_ErrorMessage__WEBPACK_IMPORTED_MODULE_10__.a,
                                          {
                                             name: 'password',
                                             children: function children(_ref9) {
                                                var error = _ref9.error;
                                                return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                                   'span',
                                                   null,
                                                   'password error: (',
                                                   react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                                      'b',
                                                      { style: { color: 'red' } },
                                                      error,
                                                   ),
                                                   ')',
                                                );
                                             },
                                          },
                                       ),
                                    ),
                                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                       _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                       { item: !0, xs: 3 },
                                       react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                          _src_utils_ErrorMessage__WEBPACK_IMPORTED_MODULE_10__.a,
                                          {
                                             name: 'arr',
                                             children: function children(_ref10) {
                                                var error = _ref10.error;
                                                return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                                   'span',
                                                   null,
                                                   'arr error: (',
                                                   react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                                      'b',
                                                      { style: { color: 'red' } },
                                                      error,
                                                   ),
                                                   ')',
                                                );
                                             },
                                          },
                                       ),
                                    ),
                                    react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                       _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                                       { item: !0, xs: 3 },
                                       react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                          _src_utils_ErrorMessage__WEBPACK_IMPORTED_MODULE_10__.a,
                                          {
                                             name: 'arr.0',
                                             children: function children(_ref11) {
                                                var error = _ref11.error;
                                                return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                                   'span',
                                                   null,
                                                   'arr.0 error: (',
                                                   react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                                      'b',
                                                      { style: { color: 'red' } },
                                                      error,
                                                   ),
                                                   ')',
                                                );
                                             },
                                          },
                                       ),
                                    ),
                                 ),
                              ),
                           ),
                        ),
                     ),
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                        { item: !0, xs: 4 },
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _utils__WEBPACK_IMPORTED_MODULE_16__.b,
                           { name: 'example' },
                        ),
                     ),
                  ),
               );
            },
            {
               __STORY__:
                  "import * as React from 'react';\nimport { ApolloForm, Field, FieldValidator } from '../src';\nimport * as Yup from 'yup';\nimport TextField from '@material-ui/core/TextField';\nimport Grid from '@material-ui/core/Grid';\nimport Button from '@material-ui/core/Button';\nimport ErrorMessage from '../src/utils/ErrorMessage';\nimport Submit from '../src/utils/Submit';\nimport FormConsumer from '../src/consumers/FormConsumer';\nimport FieldArray from '../src/field/FieldArray';\nimport { Paper } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport { PreviewState } from './utils';\n\nexport default {\n   title: 'Components',\n};\n\nconst validationSchema = Yup.object().shape({\n   email: Yup.string()\n      .required()\n      .max(5),\n   password: Yup.string()\n      .required()\n      .max(3),\n   deep: Yup.object().shape({\n      one: Yup.string()\n         .required()\n         .max(2),\n   }),\n   arr: Yup.array()\n      .of(\n         Yup.string()\n            .required()\n            .max(3),\n      )\n      .min(3)\n      .test('arr', 'Not length equal 2 words', arr => {\n         return !(arr.filter((el: string) => el.length === 2).length > 0);\n      }),\n});\n\nfunction FormTextField(props: { name: string; validate?: FieldValidator<string>; label: string }) {\n   return (\n      <Field<string> name={props.name} validate={props.validate}>\n         {({ field }) => {\n            const err = Boolean(field.touched && field.error);\n            // console.log('render ' + props.name);\n\n            return (\n               <TextField\n                  value={field.value}\n                  onChange={e => field.setFieldValue(e.target.value)}\n                  onBlur={() => field.setFieldTouched(true)}\n                  helperText={err ? field.error : undefined}\n                  error={Boolean(field.touched && field.error)}\n                  label={props.label}\n               />\n            );\n         }}\n      </Field>\n   );\n}\n\nfunction FormTextFieldArray(props: { name: string; validate: FieldValidator<string[]> }) {\n   return (\n      <Paper style={{ padding: 24 }}>\n         <Grid container spacing={2}>\n            <Grid item xs={12}>\n               <Typography>Example deep array fields</Typography>\n            </Grid>\n            <FieldArray<string> name={props.name} validate={props.validate}>\n               {({ field }) => {\n                  return (\n                     <>\n                        {field.value.map((el, i) => {\n                           return (\n                              <Grid item xs={3} key={'arr-field' + i}>\n                                 <FormTextField\n                                    key={'test' + i}\n                                    name={props.name + '.' + i}\n                                    label={props.name + '.' + i}\n                                 />\n                              </Grid>\n                           );\n                        })}\n\n                        <Grid item xs={3} style={{ display: 'flex', alignItems: 'flex-end' }}>\n                           <Button\n                              variant='contained'\n                              onClick={() => field.push((field.value.length + 1).toString())}\n                           >\n                              push\n                           </Button>\n                           <Button\n                              variant='contained'\n                              onClick={() => field.pop()}\n                              style={{ marginLeft: 16 }}\n                           >\n                              pop\n                           </Button>\n                        </Grid>\n                     </>\n                  );\n               }}\n            </FieldArray>\n         </Grid>\n      </Paper>\n   );\n}\n\nexport function Example() {\n   const [initialState, setState] = React.useState({\n      email: '1',\n      password: '',\n      deep: { one: '1', two: { test: '2' } },\n      arr: ['', '2', '31'],\n   });\n\n   return (\n      <ApolloForm\n         name='example'\n         initialState={initialState}\n         validationSchema={validationSchema}\n         validate={({ values }) => {\n            if (values.email === '12') {\n               return {\n                  email: 'Not 12',\n               };\n            }\n\n            return undefined;\n         }}\n         onSubmit={async ({ values }, form) => {\n            await wait(1000);\n            console.log('submit', values);\n            form.reset({\n               ...values,\n               email: 'Reseted',\n            });\n         }}\n         onChange={(state, form) => console.log('Values: ', state)}\n      >\n         <Grid container spacing={2}>\n            <Grid item xs={8}>\n               <Grid container spacing={2}>\n                  <Grid item xs={12}>\n                     <Paper style={{ padding: 24 }}>\n                        <Grid container spacing={2}>\n                           <Grid item xs={12}>\n                              <Typography>Example basic fields</Typography>\n                           </Grid>\n                           <Grid item xs={6}>\n                              <FormTextField\n                                 name='email'\n                                 label='email'\n                                 validate={v => {\n                                    if (v.length === 1) {\n                                       return 'custom error';\n                                    }\n                                 }}\n                              />\n                           </Grid>\n                           <Grid item xs={6}>\n                              <FormTextField name='password' label='password' />\n                           </Grid>\n                        </Grid>\n                     </Paper>\n                  </Grid>\n                  <Grid item xs={12}>\n                     <Paper style={{ padding: 24 }}>\n                        <Grid container spacing={2}>\n                           <Grid item xs={12}>\n                              <Typography>Example deep object fields</Typography>\n                           </Grid>\n                           <Grid item xs={6}>\n                              <FormTextField name='deep.one' label='deep.one' />\n                           </Grid>\n                           <Grid item xs={6}>\n                              <FormTextField name='deep.two.test' label='deep.two.test' />\n                           </Grid>\n                        </Grid>\n                     </Paper>\n                  </Grid>\n                  <Grid item xs={12}>\n                     <FormTextFieldArray\n                        name='arr'\n                        validate={arr => {\n                           if (arr.filter(el => el.length === 0).length !== 0) {\n                              return 'not empty in arr';\n                           }\n                        }}\n                     />\n                  </Grid>\n                  <Grid item xs={12}>\n                     <Paper style={{ padding: 24 }}>\n                        <Grid container spacing={2}>\n                           <Grid item xs={12}>\n                              <Typography>Example actions</Typography>\n                           </Grid>\n                           <Grid item>\n                              <FormConsumer>\n                                 {({ form }) => (\n                                    <Button variant='contained' onClick={() => form.reset()}>\n                                       RESET\n                                    </Button>\n                                 )}\n                              </FormConsumer>\n                           </Grid>\n                           <Grid item>\n                              <FormConsumer>\n                                 {({ form }) => (\n                                    <Button variant='contained' onClick={() => form.validate(true)}>\n                                       VALIDATE\n                                    </Button>\n                                 )}\n                              </FormConsumer>\n                           </Grid>\n                           <Grid item>\n                              <Submit>\n                                 {({ isValid, isSubmitted, loading }) => (\n                                    <Button\n                                       variant='contained'\n                                       type='submit'\n                                       disabled={loading || (isSubmitted ? !isValid : false)}\n                                    >\n                                       Submit\n                                    </Button>\n                                 )}\n                              </Submit>\n                           </Grid>\n                        </Grid>\n                     </Paper>\n                  </Grid>\n                  <Grid item xs={12}>\n                     <Paper style={{ padding: 24 }}>\n                        <Grid container spacing={2}>\n                           <Grid item xs={3}>\n                              <ErrorMessage\n                                 name='password'\n                                 children={({ error }) => (\n                                    <span>\n                                       password error: (<b style={{ color: 'red' }}>{error}</b>)\n                                    </span>\n                                 )}\n                              />\n                           </Grid>\n                           <Grid item xs={3}>\n                              <ErrorMessage\n                                 name='arr'\n                                 children={({ error }) => (\n                                    <span>\n                                       arr error: (<b style={{ color: 'red' }}>{error}</b>)\n                                    </span>\n                                 )}\n                              />\n                           </Grid>\n                           <Grid item xs={3}>\n                              <ErrorMessage\n                                 name='arr.0'\n                                 children={({ error }) => (\n                                    <span>\n                                       arr.0 error: (<b style={{ color: 'red' }}>{error}</b>)\n                                    </span>\n                                 )}\n                              />\n                           </Grid>\n                        </Grid>\n                     </Paper>\n                  </Grid>\n               </Grid>\n            </Grid>\n            <Grid item xs={4}>\n               <PreviewState name='example' />\n            </Grid>\n         </Grid>\n      </ApolloForm>\n   );\n}\n\nfunction wait(time: number) {\n   return new Promise(resolve => setTimeout(resolve, time));\n}\n",
               __ADDS_MAP__: {
                  'components--example': {
                     startLoc: { col: 7, line: 112 },
                     endLoc: { col: 1, line: 279 },
                     startBody: { col: 7, line: 112 },
                     endBody: { col: 1, line: 279 },
                  },
               },
               __MAIN_FILE_LOCATION__: '/example.stories.tsx',
               __MODULE_DEPENDENCIES__: [],
               __LOCAL_DEPENDENCIES__: {},
               __SOURCE_PREFIX__: '/Users/maximschiriy/Work/apollo-form/examples',
               __IDS_TO_FRAMEWORKS__: {},
            },
         );
         function wait(time) {
            return new Promise(function(resolve) {
               return setTimeout(resolve, time);
            });
         }
      },
      98: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.d(__webpack_exports__, 'a', function() {
            return CodeHighlighter;
         }),
            __webpack_require__.d(__webpack_exports__, 'b', function() {
               return PreviewState;
            }),
            __webpack_require__.d(__webpack_exports__, 'c', function() {
               return wait;
            });
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               73,
            ),
            react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_1__,
            ),
            react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1052),
            react_syntax_highlighter_dist_esm_styles_hljs_ocean__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
               467,
            ),
            _src__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(39),
            _apollo_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(65),
            _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(83);
         function CodeHighlighter(props) {
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
               react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_2__.a,
               Object.assign({}, props, {
                  language: 'tsx',
                  style:
                     react_syntax_highlighter_dist_esm_styles_hljs_ocean__WEBPACK_IMPORTED_MODULE_3__.a,
               }),
            );
         }
         function PreviewState(props) {
            var _React$useState = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(
                  Object(_src__WEBPACK_IMPORTED_MODULE_4__.d)(props.name),
               ),
               query = Object(
                  _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a,
               )(_React$useState, 1)[0],
               data = Object(_apollo_client__WEBPACK_IMPORTED_MODULE_5__.useQuery)(query).data;
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
               _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__.a,
               { style: { maxWidth: 500, padding: 20 } },
               data &&
                  react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
                     CodeHighlighter,
                     null,
                     JSON.stringify(data, null, 2),
                  ),
            );
         }
         function wait(time) {
            return new Promise(function(resolve) {
               return setTimeout(resolve, time);
            });
         }
      },
   },
   [[482, 1, 2]],
]);
//# sourceMappingURL=main.e6b11d24dea33d101d29.bundle.js.map
