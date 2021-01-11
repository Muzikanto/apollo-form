(window.webpackJsonp = window.webpackJsonp || []).push([
   [0],
   {
      1083: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            __webpack_require__.d(__webpack_exports__, 'Gallery', function() {
               return Gallery;
            });
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               62,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               97,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
               43,
            ),
            _src__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(32),
            react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0),
            _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7),
            _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(101),
            _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(81),
            _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(52),
            _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
               274,
            ),
            _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(80),
            _material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(501),
            _src_field_FileField__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(137),
            _src_utils_FirstError__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(257),
            addSourceDecorator =
               (__webpack_require__(95).withSource, __webpack_require__(95).addSource);
         __webpack_exports__.default = {
            parameters: {
               storySource: {
                  source:
                     "import { ApolloForm, Submit } from '../src';\nimport * as React from 'react';\nimport { ButtonProps, Grid } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport Paper from '@material-ui/core/Paper';\nimport Button from '@material-ui/core/Button';\nimport CircularProgress from '@material-ui/core/CircularProgress';\nimport { PreviewState, wait } from './utils';\nimport Alert from '@material-ui/lab/Alert';\nimport FormManager from '../src/managers/FormManager';\nimport FileField, { FileFieldProps } from '../src/field/FileField';\nimport FirstError from '../src/utils/FirstError';\n\nexport default {\n   title: 'Components',\n};\n\ntype GalleryFormState = {\n   image: File | undefined;\n};\n\nconst initialState: GalleryFormState = {\n   image: undefined,\n};\n\ntype ImageFieldProps = FileFieldProps;\n\nconst fileToBase64 = (file: File): Promise<string | null> =>\n   new Promise((resolve: (str: string) => void, reject) => {\n      const reader = new FileReader();\n      reader.readAsDataURL(file);\n      reader.onload = () => {\n         if (typeof reader.result === 'string') {\n            resolve(reader.result);\n         } else {\n            reject(new Error('Invalid file'));\n         }\n      };\n      reader.onerror = error => reject(error);\n   });\n\nfunction ImageField(props: Omit<ImageFieldProps, 'children'>) {\n   return (\n      <FileField accept={['image/jpeg', 'image/png']} maxSize={1024 * 500} {...props}>\n         {({ field, onClick }) => {\n            const [img, setImg] = React.useState<string | null>(null);\n\n            React.useEffect(() => {\n               if (field.value) {\n                  fileToBase64(field.value).then(r => setImg(r));\n               }\n            }, [field.value]);\n\n            return (\n               <>\n                  {field.value ? (\n                     <>\n                        {img && (\n                           <>\n                              <img style={{ width: '100%' }} src={img} alt={field.value.name} />\n                              <Button onClick={onClick} variant='contained'>\n                                 Upload new image\n                              </Button>\n                           </>\n                        )}\n                     </>\n                  ) : (\n                     <Button variant='contained' onClick={onClick}>\n                        Upload image\n                     </Button>\n                  )}\n               </>\n            );\n         }}\n      </FileField>\n   );\n}\n\nfunction SubmitButton(props: ButtonProps) {\n   return (\n      <Submit>\n         {({ isValid, isSubmitted, loading }) =>\n            loading ? (\n               <CircularProgress />\n            ) : (\n               <Button disabled={isSubmitted ? !isValid : false} {...props} />\n            )\n         }\n      </Submit>\n   );\n}\n\nfunction Form() {\n   const [form, setForm] = React.useState<FormManager<GalleryFormState> | null>(null);\n\n   return (\n      <Grid container spacing={3}>\n         <Grid item xs={12} md={6}>\n            <Paper style={{ maxWidth: 500, padding: 20 }}>\n               <ApolloForm<GalleryFormState>\n                  name='gallery'\n                  saveOnUnmount\n                  initialState={initialState}\n                  onSubmit={async ({ values }, form) => {\n                     await wait(1000);\n\n                     form.reset();\n                     console.log(values);\n                  }}\n                  onInit={form => {\n                     setForm(form);\n                  }}\n                  onChange={s => console.log(s)}\n               >\n                  <Grid container spacing={2}>\n                     <Grid item xs={12}>\n                        <Typography variant='h5' align='center'>\n                           Gallery form\n                        </Typography>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FirstError>\n                           {({ error }) => (\n                              <Alert variant='filled' severity='error'>\n                                 {error}\n                              </Alert>\n                           )}\n                        </FirstError>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <ImageField name='image' />\n                     </Grid>\n                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>\n                        <SubmitButton type='submit' variant='contained' color='primary'>\n                           Save\n                        </SubmitButton>\n                     </Grid>\n                  </Grid>\n               </ApolloForm>\n            </Paper>\n         </Grid>\n         <Grid item xs={12} md={6}>\n            {form && <PreviewState name={form.name} />}\n         </Grid>\n      </Grid>\n   );\n}\n\nexport function Gallery() {\n   return <Form />;\n}\n",
                  locationsMap: {
                     'components--gallery': {
                        startLoc: { col: 7, line: 149 },
                        endLoc: { col: 1, line: 151 },
                        startBody: { col: 7, line: 149 },
                        endBody: { col: 1, line: 151 },
                     },
                  },
               },
            },
            title: 'Components',
         };
         var initialState = { image: void 0 };
         function ImageField(props) {
            return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
               _src_field_FileField__WEBPACK_IMPORTED_MODULE_12__.a,
               Object.assign({ accept: ['image/jpeg', 'image/png'], maxSize: 512e3 }, props),
               function(_ref) {
                  var field = _ref.field,
                     onClick = _ref.onClick,
                     _React$useState = react__WEBPACK_IMPORTED_MODULE_4__.useState(null),
                     _React$useState2 = Object(
                        _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.a,
                     )(_React$useState, 2),
                     img = _React$useState2[0],
                     setImg = _React$useState2[1];
                  return (
                     react__WEBPACK_IMPORTED_MODULE_4__.useEffect(
                        function() {
                           field.value &&
                              (function fileToBase64(file) {
                                 return new Promise(function(resolve, reject) {
                                    var reader = new FileReader();
                                    reader.readAsDataURL(file),
                                       (reader.onload = function() {
                                          'string' == typeof reader.result
                                             ? resolve(reader.result)
                                             : reject(new Error('Invalid file'));
                                       }),
                                       (reader.onerror = function(error) {
                                          return reject(error);
                                       });
                                 });
                              })(field.value).then(function(r) {
                                 return setImg(r);
                              });
                        },
                        [field.value],
                     ),
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        react__WEBPACK_IMPORTED_MODULE_4__.Fragment,
                        null,
                        field.value
                           ? react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                react__WEBPACK_IMPORTED_MODULE_4__.Fragment,
                                null,
                                img &&
                                   react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                      react__WEBPACK_IMPORTED_MODULE_4__.Fragment,
                                      null,
                                      react__WEBPACK_IMPORTED_MODULE_4__.createElement('img', {
                                         style: { width: '100%' },
                                         src: img,
                                         alt: field.value.name,
                                      }),
                                      react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                         _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__.a,
                                         { onClick: onClick, variant: 'contained' },
                                         'Upload new image',
                                      ),
                                   ),
                             )
                           : react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__.a,
                                { variant: 'contained', onClick: onClick },
                                'Upload image',
                             ),
                     )
                  );
               },
            );
         }
         function SubmitButton(props) {
            return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
               _src__WEBPACK_IMPORTED_MODULE_3__.d,
               null,
               function(_ref2) {
                  var isValid = _ref2.isValid,
                     isSubmitted = _ref2.isSubmitted;
                  return _ref2.loading
                     ? react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                          _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_9__.a,
                          null,
                       )
                     : react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                          _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__.a,
                          Object.assign({ disabled: !!isSubmitted && !isValid }, props),
                       );
               },
            );
         }
         function Form() {
            var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_4__.useState(null),
               _React$useState4 = Object(
                  _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__.a,
               )(_React$useState3, 2),
               form = _React$useState4[0],
               setForm = _React$useState4[1];
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
                           name: 'gallery',
                           saveOnUnmount: !0,
                           initialState: initialState,
                           onSubmit: (function() {
                              var _ref4 = Object(
                                 _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__.a,
                              )(
                                 _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(
                                    function _callee(_ref3, form) {
                                       var values;
                                       return _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(
                                          function _callee$(_context) {
                                             for (;;)
                                                switch ((_context.prev = _context.next)) {
                                                   case 0:
                                                      return (
                                                         (values = _ref3.values),
                                                         (_context.next = 3),
                                                         Object(
                                                            _utils__WEBPACK_IMPORTED_MODULE_10__.c,
                                                         )(1e3)
                                                      );
                                                   case 3:
                                                      form.reset(), console.log(values);
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
                           onInit: function onInit(form) {
                              setForm(form);
                           },
                           onChange: function onChange(s) {
                              return console.log(s);
                           },
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
                                 'Gallery form',
                              ),
                           ),
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              _material_ui_core__WEBPACK_IMPORTED_MODULE_5__.a,
                              { item: !0, xs: 12 },
                              react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                 _src_utils_FirstError__WEBPACK_IMPORTED_MODULE_13__.a,
                                 null,
                                 function(_ref5) {
                                    var error = _ref5.error;
                                    return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                       _material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_11__.a,
                                       { variant: 'filled', severity: 'error' },
                                       error,
                                    );
                                 },
                              ),
                           ),
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              _material_ui_core__WEBPACK_IMPORTED_MODULE_5__.a,
                              { item: !0, xs: 12 },
                              react__WEBPACK_IMPORTED_MODULE_4__.createElement(ImageField, {
                                 name: 'image',
                              }),
                           ),
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              _material_ui_core__WEBPACK_IMPORTED_MODULE_5__.a,
                              {
                                 item: !0,
                                 xs: 12,
                                 style: { display: 'flex', justifyContent: 'center' },
                              },
                              react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                 SubmitButton,
                                 { type: 'submit', variant: 'contained', color: 'primary' },
                                 'Save',
                              ),
                           ),
                        ),
                     ),
                  ),
               ),
               react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                  _material_ui_core__WEBPACK_IMPORTED_MODULE_5__.a,
                  { item: !0, xs: 12, md: 6 },
                  form &&
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _utils__WEBPACK_IMPORTED_MODULE_10__.b,
                        { name: form.name },
                     ),
               ),
            );
         }
         var Gallery = addSourceDecorator(
            function Gallery() {
               return react__WEBPACK_IMPORTED_MODULE_4__.createElement(Form, null);
            },
            {
               __STORY__:
                  "import { ApolloForm, Submit } from '../src';\nimport * as React from 'react';\nimport { ButtonProps, Grid } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport Paper from '@material-ui/core/Paper';\nimport Button from '@material-ui/core/Button';\nimport CircularProgress from '@material-ui/core/CircularProgress';\nimport { PreviewState, wait } from './utils';\nimport Alert from '@material-ui/lab/Alert';\nimport FormManager from '../src/managers/FormManager';\nimport FileField, { FileFieldProps } from '../src/field/FileField';\nimport FirstError from '../src/utils/FirstError';\n\nexport default {\n   title: 'Components',\n};\n\ntype GalleryFormState = {\n   image: File | undefined;\n};\n\nconst initialState: GalleryFormState = {\n   image: undefined,\n};\n\ntype ImageFieldProps = FileFieldProps;\n\nconst fileToBase64 = (file: File): Promise<string | null> =>\n   new Promise((resolve: (str: string) => void, reject) => {\n      const reader = new FileReader();\n      reader.readAsDataURL(file);\n      reader.onload = () => {\n         if (typeof reader.result === 'string') {\n            resolve(reader.result);\n         } else {\n            reject(new Error('Invalid file'));\n         }\n      };\n      reader.onerror = error => reject(error);\n   });\n\nfunction ImageField(props: Omit<ImageFieldProps, 'children'>) {\n   return (\n      <FileField accept={['image/jpeg', 'image/png']} maxSize={1024 * 500} {...props}>\n         {({ field, onClick }) => {\n            const [img, setImg] = React.useState<string | null>(null);\n\n            React.useEffect(() => {\n               if (field.value) {\n                  fileToBase64(field.value).then(r => setImg(r));\n               }\n            }, [field.value]);\n\n            return (\n               <>\n                  {field.value ? (\n                     <>\n                        {img && (\n                           <>\n                              <img style={{ width: '100%' }} src={img} alt={field.value.name} />\n                              <Button onClick={onClick} variant='contained'>\n                                 Upload new image\n                              </Button>\n                           </>\n                        )}\n                     </>\n                  ) : (\n                     <Button variant='contained' onClick={onClick}>\n                        Upload image\n                     </Button>\n                  )}\n               </>\n            );\n         }}\n      </FileField>\n   );\n}\n\nfunction SubmitButton(props: ButtonProps) {\n   return (\n      <Submit>\n         {({ isValid, isSubmitted, loading }) =>\n            loading ? (\n               <CircularProgress />\n            ) : (\n               <Button disabled={isSubmitted ? !isValid : false} {...props} />\n            )\n         }\n      </Submit>\n   );\n}\n\nfunction Form() {\n   const [form, setForm] = React.useState<FormManager<GalleryFormState> | null>(null);\n\n   return (\n      <Grid container spacing={3}>\n         <Grid item xs={12} md={6}>\n            <Paper style={{ maxWidth: 500, padding: 20 }}>\n               <ApolloForm<GalleryFormState>\n                  name='gallery'\n                  saveOnUnmount\n                  initialState={initialState}\n                  onSubmit={async ({ values }, form) => {\n                     await wait(1000);\n\n                     form.reset();\n                     console.log(values);\n                  }}\n                  onInit={form => {\n                     setForm(form);\n                  }}\n                  onChange={s => console.log(s)}\n               >\n                  <Grid container spacing={2}>\n                     <Grid item xs={12}>\n                        <Typography variant='h5' align='center'>\n                           Gallery form\n                        </Typography>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FirstError>\n                           {({ error }) => (\n                              <Alert variant='filled' severity='error'>\n                                 {error}\n                              </Alert>\n                           )}\n                        </FirstError>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <ImageField name='image' />\n                     </Grid>\n                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>\n                        <SubmitButton type='submit' variant='contained' color='primary'>\n                           Save\n                        </SubmitButton>\n                     </Grid>\n                  </Grid>\n               </ApolloForm>\n            </Paper>\n         </Grid>\n         <Grid item xs={12} md={6}>\n            {form && <PreviewState name={form.name} />}\n         </Grid>\n      </Grid>\n   );\n}\n\nexport function Gallery() {\n   return <Form />;\n}\n",
               __ADDS_MAP__: {
                  'components--gallery': {
                     startLoc: { col: 7, line: 149 },
                     endLoc: { col: 1, line: 151 },
                     startBody: { col: 7, line: 149 },
                     endBody: { col: 1, line: 151 },
                  },
               },
               __MAIN_FILE_LOCATION__: '/gallery.stories.tsx',
               __MODULE_DEPENDENCIES__: [],
               __LOCAL_DEPENDENCIES__: {},
               __SOURCE_PREFIX__: '/Users/maximschiriy/Work/apollo-form/examples',
               __IDS_TO_FRAMEWORKS__: {},
            },
         );
      },
      1084: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            __webpack_require__.d(__webpack_exports__, 'SignIn', function() {
               return SignIn;
            });
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               62,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               97,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
               26,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
               43,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
               79,
            ),
            yup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(58),
            _src__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(32),
            _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(500),
            react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(0),
            _material_ui_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(7),
            _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(101),
            _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(81),
            _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
               1091,
            ),
            _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1090),
            _material_ui_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1092),
            _material_ui_icons__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1093),
            _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(52),
            _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
               274,
            ),
            _utils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(80),
            _src_field_getFieldProps__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(258),
            _material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(501),
            addSourceDecorator =
               (__webpack_require__(95).withSource, __webpack_require__(95).addSource);
         __webpack_exports__.default = {
            parameters: {
               storySource: {
                  source:
                     "import * as Yup from 'yup';\nimport { ApolloForm, Field, FormErrors, ResponseMessage, Submit } from '../src';\nimport TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';\nimport * as React from 'react';\nimport { IUseFieldProps } from '../src/hooks/useField';\nimport { ButtonProps, Grid } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport Paper from '@material-ui/core/Paper';\nimport InputAdornment from '@material-ui/core/InputAdornment';\nimport IconButton from '@material-ui/core/IconButton';\nimport { Visibility, VisibilityOff } from '@material-ui/icons';\nimport Button from '@material-ui/core/Button';\nimport CircularProgress from '@material-ui/core/CircularProgress';\nimport { PreviewState, wait } from './utils';\nimport getFieldProps from '../src/field/getFieldProps';\nimport Alert from '@material-ui/lab/Alert';\nimport FormManager from '../src/managers/FormManager';\nimport { useApolloClient } from '@apollo/client';\n\nexport default {\n   title: 'Components',\n};\n\ntype SignInFormState = {\n   email: string;\n   password: string;\n};\n\nconst validationSchema = Yup.object().shape<SignInFormState>({\n   email: Yup.string()\n      .required()\n      .min(4),\n   password: Yup.string()\n      .required()\n      .min(4),\n});\n\nconst initialState: SignInFormState = {\n   email: '',\n   password: '',\n};\n\ntype FormTextFieldProps = Omit<OutlinedTextFieldProps, 'variant'> & IUseFieldProps<string>;\n\nfunction FormTextField({ name, validate, ...other }: FormTextFieldProps) {\n   return (\n      <Field<string> name={name} validate={validate}>\n         {({ field }) => {\n            console.log('Render: ', name);\n\n            return <TextField {...getFieldProps(field)} variant='outlined' {...other} />;\n         }}\n      </Field>\n   );\n}\n\nfunction FormPassword(props: FormTextFieldProps) {\n   const [show, toggle] = React.useState(false);\n\n   return (\n      <FormTextField\n         {...props}\n         type={show ? 'text' : 'password'}\n         InputProps={{\n            endAdornment: (\n               <InputAdornment position='end'>\n                  <IconButton onClick={() => toggle(!show)}>\n                     {show ? <Visibility /> : <VisibilityOff />}\n                  </IconButton>\n               </InputAdornment>\n            ),\n            ...props.InputProps,\n         }}\n      />\n   );\n}\n\nfunction SubmitButton(props: ButtonProps) {\n   return (\n      <Submit>\n         {({ disabled, loading }) =>\n            loading ? <CircularProgress /> : <Button disabled={disabled} {...props} />\n         }\n      </Submit>\n   );\n}\n\nfunction Form() {\n   const [state, setState] = React.useState(initialState);\n   // const apollo = useApolloClient();\n\n   const [form, setForm] = React.useState<FormManager<SignInFormState> | null>(null);\n\n   return (\n      <Grid container spacing={3}>\n         <Grid item xs={12} md={6}>\n            <Paper style={{ maxWidth: 500, padding: 20 }}>\n               <ApolloForm<SignInFormState>\n                  name='signin'\n                  enableReinitialize\n                  initialState={initialState}\n                  validationSchema={validationSchema}\n                  onSubmit={async ({ values }, form) => {\n                     await wait(1000);\n                     console.log('Submit state: ', values);\n\n                     form.reset({ ...initialState, email: 'reseted' });\n                     // setState({...state, email: 'reseted'})\n                     form.responseMessage('Invalid password');\n\n                     apollo.resetStore().then();\n                  }}\n                  onInit={form => {\n                     setForm(form);\n                  }}\n               >\n                  <Grid container spacing={2}>\n                     <Grid item xs={12}>\n                        <Typography variant='h5' align='center'>\n                           Sign in form\n                        </Typography>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <ResponseMessage>\n                           {({ error }) => (\n                              <Alert variant='filled' severity='error'>\n                                 {error}\n                              </Alert>\n                           )}\n                        </ResponseMessage>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FormTextField\n                           name='email'\n                           type='email'\n                           label='Enter email'\n                           validate={email => {\n                              if (email && email.includes('@mail.ru')) {\n                                 return 'Please don`t use @mail.ru email';\n                              }\n                           }}\n                           fullWidth\n                        />\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FormPassword name='password' label='Enter password' fullWidth />\n                     </Grid>\n                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>\n                        <SubmitButton type='submit' variant='contained' color='primary'>\n                           Sign in\n                        </SubmitButton>\n                     </Grid>\n                  </Grid>\n               </ApolloForm>\n            </Paper>\n         </Grid>\n         <Grid item xs={12} md={6}>\n            {form && <PreviewState name={form.name} />}\n         </Grid>\n      </Grid>\n   );\n}\n\nexport function SignIn() {\n   return <Form />;\n}\n",
                  locationsMap: {
                     'components--sign-in': {
                        startLoc: { col: 7, line: 164 },
                        endLoc: { col: 1, line: 166 },
                        startBody: { col: 7, line: 164 },
                        endBody: { col: 1, line: 166 },
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
                  var field = _ref2.field;
                  return (
                     console.log('Render: ', name),
                     react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                        _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__.a,
                        Object.assign(
                           {},
                           Object(_src_field_getFieldProps__WEBPACK_IMPORTED_MODULE_19__.a)(field),
                           { variant: 'outlined' },
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
               _src__WEBPACK_IMPORTED_MODULE_6__.d,
               null,
               function(_ref3) {
                  var disabled = _ref3.disabled;
                  return _ref3.loading
                     ? react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                          _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_17__.a,
                          null,
                       )
                     : react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                          _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_16__.a,
                          Object.assign({ disabled: disabled }, props),
                       );
               },
            );
         }
         function Form() {
            var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_8__.useState(initialState),
               _React$useState4 = Object(
                  _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__.a,
               )(_React$useState3, 2),
               _React$useState5 =
                  (_React$useState4[0],
                  _React$useState4[1],
                  react__WEBPACK_IMPORTED_MODULE_8__.useState(null)),
               _React$useState6 = Object(
                  _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__.a,
               )(_React$useState5, 2),
               form = _React$useState6[0],
               setForm = _React$useState6[1];
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
                           enableReinitialize: !0,
                           initialState: initialState,
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
                                                            )({}, initialState, {
                                                               email: 'reseted',
                                                            }),
                                                         ),
                                                         form.responseMessage('Invalid password'),
                                                         apollo.resetStore().then();
                                                   case 7:
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
                           onInit: function onInit(form) {
                              setForm(form);
                           },
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
                                 _src__WEBPACK_IMPORTED_MODULE_6__.c,
                                 null,
                                 function(_ref6) {
                                    var error = _ref6.error;
                                    return react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                                       _material_ui_lab_Alert__WEBPACK_IMPORTED_MODULE_20__.a,
                                       { variant: 'filled', severity: 'error' },
                                       error,
                                    );
                                 },
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
                  form &&
                     react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                        _utils__WEBPACK_IMPORTED_MODULE_18__.b,
                        { name: form.name },
                     ),
               ),
            );
         }
         var SignIn = addSourceDecorator(
            function SignIn() {
               return react__WEBPACK_IMPORTED_MODULE_8__.createElement(Form, null);
            },
            {
               __STORY__:
                  "import * as Yup from 'yup';\nimport { ApolloForm, Field, FormErrors, ResponseMessage, Submit } from '../src';\nimport TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';\nimport * as React from 'react';\nimport { IUseFieldProps } from '../src/hooks/useField';\nimport { ButtonProps, Grid } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport Paper from '@material-ui/core/Paper';\nimport InputAdornment from '@material-ui/core/InputAdornment';\nimport IconButton from '@material-ui/core/IconButton';\nimport { Visibility, VisibilityOff } from '@material-ui/icons';\nimport Button from '@material-ui/core/Button';\nimport CircularProgress from '@material-ui/core/CircularProgress';\nimport { PreviewState, wait } from './utils';\nimport getFieldProps from '../src/field/getFieldProps';\nimport Alert from '@material-ui/lab/Alert';\nimport FormManager from '../src/managers/FormManager';\nimport { useApolloClient } from '@apollo/client';\n\nexport default {\n   title: 'Components',\n};\n\ntype SignInFormState = {\n   email: string;\n   password: string;\n};\n\nconst validationSchema = Yup.object().shape<SignInFormState>({\n   email: Yup.string()\n      .required()\n      .min(4),\n   password: Yup.string()\n      .required()\n      .min(4),\n});\n\nconst initialState: SignInFormState = {\n   email: '',\n   password: '',\n};\n\ntype FormTextFieldProps = Omit<OutlinedTextFieldProps, 'variant'> & IUseFieldProps<string>;\n\nfunction FormTextField({ name, validate, ...other }: FormTextFieldProps) {\n   return (\n      <Field<string> name={name} validate={validate}>\n         {({ field }) => {\n            console.log('Render: ', name);\n\n            return <TextField {...getFieldProps(field)} variant='outlined' {...other} />;\n         }}\n      </Field>\n   );\n}\n\nfunction FormPassword(props: FormTextFieldProps) {\n   const [show, toggle] = React.useState(false);\n\n   return (\n      <FormTextField\n         {...props}\n         type={show ? 'text' : 'password'}\n         InputProps={{\n            endAdornment: (\n               <InputAdornment position='end'>\n                  <IconButton onClick={() => toggle(!show)}>\n                     {show ? <Visibility /> : <VisibilityOff />}\n                  </IconButton>\n               </InputAdornment>\n            ),\n            ...props.InputProps,\n         }}\n      />\n   );\n}\n\nfunction SubmitButton(props: ButtonProps) {\n   return (\n      <Submit>\n         {({ disabled, loading }) =>\n            loading ? <CircularProgress /> : <Button disabled={disabled} {...props} />\n         }\n      </Submit>\n   );\n}\n\nfunction Form() {\n   const [state, setState] = React.useState(initialState);\n   // const apollo = useApolloClient();\n\n   const [form, setForm] = React.useState<FormManager<SignInFormState> | null>(null);\n\n   return (\n      <Grid container spacing={3}>\n         <Grid item xs={12} md={6}>\n            <Paper style={{ maxWidth: 500, padding: 20 }}>\n               <ApolloForm<SignInFormState>\n                  name='signin'\n                  enableReinitialize\n                  initialState={initialState}\n                  validationSchema={validationSchema}\n                  onSubmit={async ({ values }, form) => {\n                     await wait(1000);\n                     console.log('Submit state: ', values);\n\n                     form.reset({ ...initialState, email: 'reseted' });\n                     // setState({...state, email: 'reseted'})\n                     form.responseMessage('Invalid password');\n\n                     apollo.resetStore().then();\n                  }}\n                  onInit={form => {\n                     setForm(form);\n                  }}\n               >\n                  <Grid container spacing={2}>\n                     <Grid item xs={12}>\n                        <Typography variant='h5' align='center'>\n                           Sign in form\n                        </Typography>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <ResponseMessage>\n                           {({ error }) => (\n                              <Alert variant='filled' severity='error'>\n                                 {error}\n                              </Alert>\n                           )}\n                        </ResponseMessage>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FormTextField\n                           name='email'\n                           type='email'\n                           label='Enter email'\n                           validate={email => {\n                              if (email && email.includes('@mail.ru')) {\n                                 return 'Please don`t use @mail.ru email';\n                              }\n                           }}\n                           fullWidth\n                        />\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FormPassword name='password' label='Enter password' fullWidth />\n                     </Grid>\n                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>\n                        <SubmitButton type='submit' variant='contained' color='primary'>\n                           Sign in\n                        </SubmitButton>\n                     </Grid>\n                  </Grid>\n               </ApolloForm>\n            </Paper>\n         </Grid>\n         <Grid item xs={12} md={6}>\n            {form && <PreviewState name={form.name} />}\n         </Grid>\n      </Grid>\n   );\n}\n\nexport function SignIn() {\n   return <Form />;\n}\n",
               __ADDS_MAP__: {
                  'components--sign-in': {
                     startLoc: { col: 7, line: 164 },
                     endLoc: { col: 1, line: 166 },
                     startBody: { col: 7, line: 164 },
                     endBody: { col: 1, line: 166 },
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
      1085: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            __webpack_require__.d(__webpack_exports__, 'TodoList', function() {
               return TodoList;
            });
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               43,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               62,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
               _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
               97,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
               79,
            ),
            yup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(58),
            _src__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(32),
            react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(0),
            _material_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7),
            _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(101),
            _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(81),
            _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(52),
            _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
               274,
            ),
            _utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(80),
            _apollo_client__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(72),
            _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1099),
            addSourceDecorator =
               (__webpack_require__(95).withSource, __webpack_require__(95).addSource);
         __webpack_exports__.default = {
            parameters: {
               storySource: {
                  source:
                     "import * as Yup from 'yup';\nimport { ApolloForm, Field, makeApolloFormQuery, Submit, useFieldArray } from '../src';\nimport TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';\nimport * as React from 'react';\nimport { IUseFieldProps } from '../src/hooks/useField';\nimport { ButtonProps, Grid } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport Paper from '@material-ui/core/Paper';\nimport InputAdornment from '@material-ui/core/InputAdornment';\nimport IconButton from '@material-ui/core/IconButton';\nimport { Visibility, VisibilityOff } from '@material-ui/icons';\nimport Button from '@material-ui/core/Button';\nimport CircularProgress from '@material-ui/core/CircularProgress';\nimport { CodeHighlighter } from './utils';\nimport { useQuery } from '@apollo/client';\nimport Box from '@material-ui/core/Box';\nimport Chip from '@material-ui/core/Chip';\n\nexport default {\n   title: 'Components',\n};\n\ntype SignInFormState = {\n   todos: Date[];\n};\n\nconst validationSchema = Yup.object().shape<SignInFormState>({\n   todos: Yup.array()\n      .of(Yup.date().max(addDay(new Date(), 3)))\n      .required()\n      .min(2),\n});\n\nconst initialState: SignInFormState = {\n   todos: [addDay(new Date(), 1), addDay(new Date(), 2), addDay(new Date(), 3)],\n};\n\ntype FormTodoManagerProps = IUseFieldProps<Date[]>;\n\nfunction FormTodoManager({ name, validate, ...other }: FormTodoManagerProps) {\n   const field = useFieldArray({ name, validate });\n\n   return (\n      <Grid container spacing={2}>\n         {field.value.map((todo, i) => {\n            return (\n               <Grid item key={'todo-' + i}>\n                  <Chip\n                     label={todo.toLocaleDateString()}\n                     style={{ width: 150 }}\n                     onDelete={() => {\n                        field.removeAt(i);\n                     }}\n                  />\n               </Grid>\n            );\n         })}\n         <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>\n            <Button\n               onClick={() => field.push(addDay(new Date(), field.value.length + 1 || 1))}\n               variant='contained'\n               color='primary'\n            >\n               Push todo\n            </Button>\n            <Button\n               onClick={() => field.swap(0, field.value.length - 1)}\n               variant='contained'\n               color='primary'\n               disabled={field.value.length < 2}\n            >\n               Swap first and last\n            </Button>\n         </Grid>\n\n         <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>\n            <Button\n               onClick={() => field.pop()}\n               variant='contained'\n               color='secondary'\n               disabled={field.value.length < 1}\n            >\n               Delete last\n            </Button>\n            <Button\n               onClick={() => field.clear()}\n               variant='contained'\n               color='secondary'\n               disabled={field.value.length < 1}\n            >\n               Clear\n            </Button>\n         </Grid>\n      </Grid>\n   );\n}\n\nfunction SubmitButton(props: ButtonProps) {\n   return (\n      <Submit>\n         {({ isValid, isSubmitted, loading }) =>\n            loading ? (\n               <CircularProgress />\n            ) : (\n               <Button disabled={isSubmitted ? !isValid : false} {...props} />\n            )\n         }\n      </Submit>\n   );\n}\n\nexport function TodoList() {\n   return (\n      <Grid container spacing={3}>\n         <Grid item xs={12} md={6}>\n            <Paper style={{ maxWidth: 500, padding: 20 }}>\n               <ApolloForm<SignInFormState>\n                  name='todolist'\n                  saveOnUnmount\n                  initialState={initialState}\n                  validationSchema={validationSchema}\n                  onSubmit={async ({ values }, form) => {\n                     await wait(1000);\n                     console.log('Submit state: ', values);\n\n                     form.reset({\n                        todos: [],\n                     });\n                  }}\n               >\n                  <Grid container spacing={2}>\n                     <Grid item xs={12}>\n                        <Typography variant='h5' align='center'>\n                           Todo list\n                        </Typography>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FormTodoManager name='todos' />\n                     </Grid>\n                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>\n                        <SubmitButton type='submit' variant='contained' color='primary'>\n                           Save\n                        </SubmitButton>\n                     </Grid>\n                  </Grid>\n               </ApolloForm>\n            </Paper>\n         </Grid>\n         <Grid item xs={12} md={6}>\n            <PreviewState />\n         </Grid>\n      </Grid>\n   );\n}\n\nfunction PreviewState() {\n   const [query] = React.useState(makeApolloFormQuery('todolist'));\n\n   const { data } = useQuery(query);\n\n   return (\n      <Paper style={{ maxWidth: 500, padding: 20 }}>\n         {data && <CodeHighlighter>{JSON.stringify(data, null, 2)}</CodeHighlighter>}\n      </Paper>\n   );\n}\n\nfunction addDay(date: Date, days: number) {\n   return new Date(date.getTime() + 1000 * 60 * 60 * 24 * days);\n}\n\nfunction wait(time: number) {\n   return new Promise(resolve => setTimeout(resolve, time));\n}\n",
                  locationsMap: {
                     'components--todo-list': {
                        startLoc: { col: 7, line: 112 },
                        endLoc: { col: 1, line: 154 },
                        startBody: { col: 7, line: 112 },
                        endBody: { col: 1, line: 154 },
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
                  Object(_src__WEBPACK_IMPORTED_MODULE_5__.f)({ name: name, validate: validate }));
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
               _src__WEBPACK_IMPORTED_MODULE_5__.d,
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
                              saveOnUnmount: !0,
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
                  "import * as Yup from 'yup';\nimport { ApolloForm, Field, makeApolloFormQuery, Submit, useFieldArray } from '../src';\nimport TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';\nimport * as React from 'react';\nimport { IUseFieldProps } from '../src/hooks/useField';\nimport { ButtonProps, Grid } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport Paper from '@material-ui/core/Paper';\nimport InputAdornment from '@material-ui/core/InputAdornment';\nimport IconButton from '@material-ui/core/IconButton';\nimport { Visibility, VisibilityOff } from '@material-ui/icons';\nimport Button from '@material-ui/core/Button';\nimport CircularProgress from '@material-ui/core/CircularProgress';\nimport { CodeHighlighter } from './utils';\nimport { useQuery } from '@apollo/client';\nimport Box from '@material-ui/core/Box';\nimport Chip from '@material-ui/core/Chip';\n\nexport default {\n   title: 'Components',\n};\n\ntype SignInFormState = {\n   todos: Date[];\n};\n\nconst validationSchema = Yup.object().shape<SignInFormState>({\n   todos: Yup.array()\n      .of(Yup.date().max(addDay(new Date(), 3)))\n      .required()\n      .min(2),\n});\n\nconst initialState: SignInFormState = {\n   todos: [addDay(new Date(), 1), addDay(new Date(), 2), addDay(new Date(), 3)],\n};\n\ntype FormTodoManagerProps = IUseFieldProps<Date[]>;\n\nfunction FormTodoManager({ name, validate, ...other }: FormTodoManagerProps) {\n   const field = useFieldArray({ name, validate });\n\n   return (\n      <Grid container spacing={2}>\n         {field.value.map((todo, i) => {\n            return (\n               <Grid item key={'todo-' + i}>\n                  <Chip\n                     label={todo.toLocaleDateString()}\n                     style={{ width: 150 }}\n                     onDelete={() => {\n                        field.removeAt(i);\n                     }}\n                  />\n               </Grid>\n            );\n         })}\n         <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>\n            <Button\n               onClick={() => field.push(addDay(new Date(), field.value.length + 1 || 1))}\n               variant='contained'\n               color='primary'\n            >\n               Push todo\n            </Button>\n            <Button\n               onClick={() => field.swap(0, field.value.length - 1)}\n               variant='contained'\n               color='primary'\n               disabled={field.value.length < 2}\n            >\n               Swap first and last\n            </Button>\n         </Grid>\n\n         <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>\n            <Button\n               onClick={() => field.pop()}\n               variant='contained'\n               color='secondary'\n               disabled={field.value.length < 1}\n            >\n               Delete last\n            </Button>\n            <Button\n               onClick={() => field.clear()}\n               variant='contained'\n               color='secondary'\n               disabled={field.value.length < 1}\n            >\n               Clear\n            </Button>\n         </Grid>\n      </Grid>\n   );\n}\n\nfunction SubmitButton(props: ButtonProps) {\n   return (\n      <Submit>\n         {({ isValid, isSubmitted, loading }) =>\n            loading ? (\n               <CircularProgress />\n            ) : (\n               <Button disabled={isSubmitted ? !isValid : false} {...props} />\n            )\n         }\n      </Submit>\n   );\n}\n\nexport function TodoList() {\n   return (\n      <Grid container spacing={3}>\n         <Grid item xs={12} md={6}>\n            <Paper style={{ maxWidth: 500, padding: 20 }}>\n               <ApolloForm<SignInFormState>\n                  name='todolist'\n                  saveOnUnmount\n                  initialState={initialState}\n                  validationSchema={validationSchema}\n                  onSubmit={async ({ values }, form) => {\n                     await wait(1000);\n                     console.log('Submit state: ', values);\n\n                     form.reset({\n                        todos: [],\n                     });\n                  }}\n               >\n                  <Grid container spacing={2}>\n                     <Grid item xs={12}>\n                        <Typography variant='h5' align='center'>\n                           Todo list\n                        </Typography>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FormTodoManager name='todos' />\n                     </Grid>\n                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>\n                        <SubmitButton type='submit' variant='contained' color='primary'>\n                           Save\n                        </SubmitButton>\n                     </Grid>\n                  </Grid>\n               </ApolloForm>\n            </Paper>\n         </Grid>\n         <Grid item xs={12} md={6}>\n            <PreviewState />\n         </Grid>\n      </Grid>\n   );\n}\n\nfunction PreviewState() {\n   const [query] = React.useState(makeApolloFormQuery('todolist'));\n\n   const { data } = useQuery(query);\n\n   return (\n      <Paper style={{ maxWidth: 500, padding: 20 }}>\n         {data && <CodeHighlighter>{JSON.stringify(data, null, 2)}</CodeHighlighter>}\n      </Paper>\n   );\n}\n\nfunction addDay(date: Date, days: number) {\n   return new Date(date.getTime() + 1000 * 60 * 60 * 24 * days);\n}\n\nfunction wait(time: number) {\n   return new Promise(resolve => setTimeout(resolve, time));\n}\n",
               __ADDS_MAP__: {
                  'components--todo-list': {
                     startLoc: { col: 7, line: 112 },
                     endLoc: { col: 1, line: 154 },
                     startBody: { col: 7, line: 112 },
                     endBody: { col: 1, line: 154 },
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
                  Object(_src__WEBPACK_IMPORTED_MODULE_5__.e)('todolist'),
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
      1086: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            __webpack_require__.d(__webpack_exports__, 'WithConfirm', function() {
               return WithConfirm;
            });
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               62,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               97,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
               43,
            ),
            _src__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(32),
            react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0),
            _material_ui_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7),
            _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(101),
            _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(81),
            _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(52),
            _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
               274,
            ),
            _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(80),
            _apollo_client__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(72),
            _material_ui_core_Dialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1098),
            _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1096),
            _material_ui_core_DialogActions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
               1095,
            ),
            _material_ui_core_DialogTitle__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1094),
            addSourceDecorator =
               (__webpack_require__(95).withSource, __webpack_require__(95).addSource);
         __webpack_exports__.default = {
            parameters: {
               storySource: {
                  source:
                     "import { ApolloForm, makeApolloFormQuery, Submit } from '../src';\nimport * as React from 'react';\nimport { ButtonProps, Grid } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport Paper from '@material-ui/core/Paper';\nimport Button from '@material-ui/core/Button';\nimport CircularProgress from '@material-ui/core/CircularProgress';\nimport { CodeHighlighter } from './utils';\nimport { useQuery } from '@apollo/client';\nimport Dialog from '@material-ui/core/Dialog';\nimport Box from '@material-ui/core/Box';\nimport DialogActions from '@material-ui/core/DialogActions';\nimport DialogTitle from '@material-ui/core/DialogTitle';\n\nexport default {\n   title: 'Components',\n};\n\ntype WithConfirmFormState = {\n   test: string;\n};\n\nconst initialState: WithConfirmFormState = {\n   test: '',\n};\n\nfunction SubmitConfirm(props: ButtonProps) {\n   const [openConfirm, toggleConfirm] = React.useState(false);\n\n   const onClose = () => toggleConfirm(false);\n\n   return (\n      <Submit>\n         {({ isValid, isSubmitted, loading, form }) => (\n            <>\n               <Button\n                  disabled={isSubmitted ? !isValid : false}\n                  onClick={() => toggleConfirm(true)}\n                  {...props}\n               />\n               <Dialog maxWidth='xs' fullWidth open={openConfirm} onClose={onClose}>\n                  <DialogTitle>Confirm title</DialogTitle>\n                  <DialogActions>\n                     {loading ? (\n                        <CircularProgress />\n                     ) : (\n                        <Box display='flex'>\n                           <Button onClick={onClose} variant='contained'>\n                              Decline\n                           </Button>\n                           <Button\n                              style={{ marginLeft: 16 }}\n                              variant='contained'\n                              color='primary'\n                              onClick={() => {\n                                 form.submit().then(() => {\n                                    onClose();\n                                 });\n                              }}\n                           >\n                              Accept\n                           </Button>\n                        </Box>\n                     )}\n                  </DialogActions>\n               </Dialog>\n            </>\n         )}\n      </Submit>\n   );\n}\n\nexport function WithConfirm() {\n   return (\n      <Grid container spacing={3}>\n         <Grid item xs={12} md={6}>\n            <Paper style={{ maxWidth: 500, padding: 20 }}>\n               <ApolloForm<WithConfirmFormState>\n                  name='withConfirm'\n                  saveOnUnmount\n                  initialState={initialState}\n                  onSubmit={async ({ values }, form) => {\n                     await wait(1000);\n                     console.log('Submit state: ', values);\n                  }}\n               >\n                  <Grid container spacing={2}>\n                     <Grid item xs={12}>\n                        <Typography variant='h5' align='center'>\n                           Example confirm\n                        </Typography>\n                     </Grid>\n                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>\n                        <SubmitConfirm variant='contained' color='primary'>\n                           Submit (with confirm)\n                        </SubmitConfirm>\n                     </Grid>\n                  </Grid>\n               </ApolloForm>\n            </Paper>\n         </Grid>\n         <Grid item xs={12} md={6}>\n            <PreviewState />\n         </Grid>\n      </Grid>\n   );\n}\n\nconst query = makeApolloFormQuery('withConfirm');\n\nfunction PreviewState() {\n   const { data } = useQuery(query);\n\n   return (\n      <Paper style={{ maxWidth: 500, padding: 20 }}>\n         {data && <CodeHighlighter>{JSON.stringify(data, null, 2)}</CodeHighlighter>}\n      </Paper>\n   );\n}\n\nfunction wait(time: number) {\n   return new Promise(resolve => setTimeout(resolve, time));\n}\n",
                  locationsMap: {
                     'components--with-confirm': {
                        startLoc: { col: 7, line: 73 },
                        endLoc: { col: 1, line: 107 },
                        startBody: { col: 7, line: 73 },
                        endBody: { col: 1, line: 107 },
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
               _src__WEBPACK_IMPORTED_MODULE_3__.d,
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
                                 saveOnUnmount: !0,
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
                     "import { ApolloForm, makeApolloFormQuery, Submit } from '../src';\nimport * as React from 'react';\nimport { ButtonProps, Grid } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport Paper from '@material-ui/core/Paper';\nimport Button from '@material-ui/core/Button';\nimport CircularProgress from '@material-ui/core/CircularProgress';\nimport { CodeHighlighter } from './utils';\nimport { useQuery } from '@apollo/client';\nimport Dialog from '@material-ui/core/Dialog';\nimport Box from '@material-ui/core/Box';\nimport DialogActions from '@material-ui/core/DialogActions';\nimport DialogTitle from '@material-ui/core/DialogTitle';\n\nexport default {\n   title: 'Components',\n};\n\ntype WithConfirmFormState = {\n   test: string;\n};\n\nconst initialState: WithConfirmFormState = {\n   test: '',\n};\n\nfunction SubmitConfirm(props: ButtonProps) {\n   const [openConfirm, toggleConfirm] = React.useState(false);\n\n   const onClose = () => toggleConfirm(false);\n\n   return (\n      <Submit>\n         {({ isValid, isSubmitted, loading, form }) => (\n            <>\n               <Button\n                  disabled={isSubmitted ? !isValid : false}\n                  onClick={() => toggleConfirm(true)}\n                  {...props}\n               />\n               <Dialog maxWidth='xs' fullWidth open={openConfirm} onClose={onClose}>\n                  <DialogTitle>Confirm title</DialogTitle>\n                  <DialogActions>\n                     {loading ? (\n                        <CircularProgress />\n                     ) : (\n                        <Box display='flex'>\n                           <Button onClick={onClose} variant='contained'>\n                              Decline\n                           </Button>\n                           <Button\n                              style={{ marginLeft: 16 }}\n                              variant='contained'\n                              color='primary'\n                              onClick={() => {\n                                 form.submit().then(() => {\n                                    onClose();\n                                 });\n                              }}\n                           >\n                              Accept\n                           </Button>\n                        </Box>\n                     )}\n                  </DialogActions>\n               </Dialog>\n            </>\n         )}\n      </Submit>\n   );\n}\n\nexport function WithConfirm() {\n   return (\n      <Grid container spacing={3}>\n         <Grid item xs={12} md={6}>\n            <Paper style={{ maxWidth: 500, padding: 20 }}>\n               <ApolloForm<WithConfirmFormState>\n                  name='withConfirm'\n                  saveOnUnmount\n                  initialState={initialState}\n                  onSubmit={async ({ values }, form) => {\n                     await wait(1000);\n                     console.log('Submit state: ', values);\n                  }}\n               >\n                  <Grid container spacing={2}>\n                     <Grid item xs={12}>\n                        <Typography variant='h5' align='center'>\n                           Example confirm\n                        </Typography>\n                     </Grid>\n                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>\n                        <SubmitConfirm variant='contained' color='primary'>\n                           Submit (with confirm)\n                        </SubmitConfirm>\n                     </Grid>\n                  </Grid>\n               </ApolloForm>\n            </Paper>\n         </Grid>\n         <Grid item xs={12} md={6}>\n            <PreviewState />\n         </Grid>\n      </Grid>\n   );\n}\n\nconst query = makeApolloFormQuery('withConfirm');\n\nfunction PreviewState() {\n   const { data } = useQuery(query);\n\n   return (\n      <Paper style={{ maxWidth: 500, padding: 20 }}>\n         {data && <CodeHighlighter>{JSON.stringify(data, null, 2)}</CodeHighlighter>}\n      </Paper>\n   );\n}\n\nfunction wait(time: number) {\n   return new Promise(resolve => setTimeout(resolve, time));\n}\n",
                  __ADDS_MAP__: {
                     'components--with-confirm': {
                        startLoc: { col: 7, line: 73 },
                        endLoc: { col: 1, line: 107 },
                        startBody: { col: 7, line: 73 },
                        endBody: { col: 1, line: 107 },
                     },
                  },
                  __MAIN_FILE_LOCATION__: '/with-confirm.stories.tsx',
                  __MODULE_DEPENDENCIES__: [],
                  __LOCAL_DEPENDENCIES__: {},
                  __SOURCE_PREFIX__: '/Users/maximschiriy/Work/apollo-form/examples',
                  __IDS_TO_FRAMEWORKS__: {},
               },
            ),
            query = Object(_src__WEBPACK_IMPORTED_MODULE_3__.e)('withConfirm');
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
      136: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               43,
            ),
            react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_1__,
            );
         function parseFileList(fileList) {
            for (var list = [], i = 0; i < fileList.length; i++) {
               var file = fileList.item(i);
               file && list.push(file);
            }
            return list;
         }
         __webpack_exports__.a = function FilePicker(props) {
            var fileInputRef = react__WEBPACK_IMPORTED_MODULE_1___default.a.createRef(),
               _React$useState = react__WEBPACK_IMPORTED_MODULE_1___default.a.useState(!1),
               _React$useState2 = Object(
                  _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.a,
               )(_React$useState, 2),
               dragged = _React$useState2[0],
               setDragged = _React$useState2[1],
               onClick = react__WEBPACK_IMPORTED_MODULE_1___default.a.useCallback(
                  function(e) {
                     fileInputRef.current && fileInputRef.current.click();
                  },
                  [fileInputRef],
               ),
               _onChange = react__WEBPACK_IMPORTED_MODULE_1___default.a.useCallback(
                  function(e, list) {
                     if (props.accept && -1 === props.accept.indexOf(list[0].type))
                        props.onError && props.onError('Wrong file format');
                     else if (props.maxSize && list[0].size > props.maxSize)
                        props.onError && props.onError('File size is to large');
                     else if (props.multiple) {
                        var arr = [];
                        props.reset || arr.push.apply(arr, props.value),
                           arr.push.apply(arr, list),
                           props.onChange && props.onChange(e, arr);
                     } else props.onChange && props.onChange(e, list[0]);
                  },
                  [props.onChange, props.value],
               ),
               onDragEnter = react__WEBPACK_IMPORTED_MODULE_1___default.a.useCallback(function(e) {
                  e.preventDefault(),
                     e.stopPropagation(),
                     e.dataTransfer.items && e.dataTransfer.items.length > 0 && setDragged(!0);
               }, []),
               onDragLeave = react__WEBPACK_IMPORTED_MODULE_1___default.a.useCallback(function(e) {
                  e.preventDefault(), e.stopPropagation(), setDragged(!1);
               }, []),
               onDragOver = react__WEBPACK_IMPORTED_MODULE_1___default.a.useCallback(function(e) {
                  e.preventDefault(), e.stopPropagation();
               }, []),
               onDrop = react__WEBPACK_IMPORTED_MODULE_1___default.a.useCallback(function(e) {
                  e.preventDefault(),
                     e.stopPropagation(),
                     setDragged(!1),
                     e.dataTransfer.files &&
                        e.dataTransfer.files.length > 0 &&
                        (_onChange(e, parseFileList(e.dataTransfer.files)),
                        e.dataTransfer.clearData());
               }, []);
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
               react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment,
               null,
               props.children({
                  onClick: onClick,
                  onDragEnter: onDragEnter,
                  onDragLeave: onDragLeave,
                  onDragOver: onDragOver,
                  onDrop: onDrop,
                  dragged: dragged,
               }),
               react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement('input', {
                  ref: fileInputRef,
                  type: 'file',
                  value: '',
                  accept: props.accept ? props.accept.join(',') : void 0,
                  style: { display: 'none' },
                  multiple: props.multiple,
                  onChange: function onChange(e) {
                     var targetFiles = e.target.files;
                     targetFiles && _onChange(e, parseFileList(targetFiles)), (e.target.value = '');
                  },
                  'data-max-size': props.maxSize,
               }),
            );
         };
      },
      137: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               26,
            ),
            react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_1__,
            ),
            _hooks_useField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96),
            _consumers_FilePicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(136);
         __webpack_exports__.a = function FileField(props) {
            var field = Object(_hooks_useField__WEBPACK_IMPORTED_MODULE_2__.a)({
               name: props.name,
               validate: props.validate,
            });
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
               _consumers_FilePicker__WEBPACK_IMPORTED_MODULE_3__.a,
               Object.assign({}, props, {
                  value: field.value,
                  onChange: function onChange(e, value) {
                     field.setFieldValue(value);
                  },
                  onError: function onError(err) {
                     field.setFieldError(props.prepareError ? props.prepareError(err) : err);
                  },
               }),
               function(childProps) {
                  return props.children(
                     Object(
                        _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__.a,
                     )({}, childProps, { field: field }),
                  );
               },
            );
         };
      },
      153: function(module, exports) {},
      154: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            FormContext = __webpack_require__
               .n(react__WEBPACK_IMPORTED_MODULE_0__)
               .a.createContext({});
         __webpack_exports__.a = FormContext;
      },
      155: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               26,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               124,
            ),
            _useField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96);
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
      159: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
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
      202: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
         __webpack_exports__.a = function FormConsumer(_ref) {
            var Render = _ref.children,
               form = Object(_hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__.a)();
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Render, {
               form: form,
            });
         };
      },
      251: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               483,
            ),
            _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72);
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
      255: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               79,
            ),
            react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_1__,
            ),
            _hooks_useFieldArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(155),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31);
         __webpack_exports__.a = function FieldArray(props) {
            var children = props.children,
               fieldArrProps = Object(
                  _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__.a,
               )(props, ['children']),
               form = Object(_hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_3__.a)(),
               field = Object(_hooks_useFieldArray__WEBPACK_IMPORTED_MODULE_2__.a)(fieldArrProps);
            return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(
               react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment,
               null,
               children({ field: field, form: form }),
            );
         };
      },
      256: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
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
               disabled: (!isValid && isSubmitted) || loading || !existsChanges,
               isValid: isValid,
               loading: loading,
               existsChanges: existsChanges,
               isSubmitted: isSubmitted,
               form: apolloForm,
            });
         };
      },
      257: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31),
            _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(57);
         __webpack_exports__.a = function FirstError(props) {
            var apolloForm = Object(_hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__.a)(),
               errors =
                  (apolloForm.useState(function(s) {
                     return s.isSubmitted;
                  }),
                  apolloForm.useState(function(s) {
                     return s.errors;
                  })),
               existsChanges = apolloForm.useState(function(s) {
                  return s.existsChanges;
               }),
               responseMessage = apolloForm.useState(function(s) {
                  return s.responseMessage;
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
                  },
               error = void 0;
            responseMessage && !existsChanges && (error = responseMessage);
            var firstErrorMessage = Object(_utils__WEBPACK_IMPORTED_MODULE_2__.a)(errors);
            return (
               props.showIfSubmitted,
               firstErrorMessage && (error = firstErrorMessage),
               error
                  ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, {
                       error: error,
                    })
                  : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
                       react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment,
                       null,
                    )
            );
         };
      },
      258: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_exports__.a = function getFieldProps(field) {
            var error = Boolean(!field.focused && field.touched && field.error);
            return {
               value: field.value,
               error: error,
               helperText: error ? field.error : void 0,
               onChange: function onChange(e) {
                  return (
                     'checkbox' === e.target.type
                        ? field.setFieldValue(e.target.checked)
                        : field.setFieldValue(e.target.value),
                     e
                  );
               },
               onFocus: function onFocus(e) {
                  return field.setFieldFocused(), e;
               },
               onBlur: function onBlur(e) {
                  return field.setFieldTouched(!0), e;
               },
            };
         };
      },
      31: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            _utils_FormContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(154);
         __webpack_exports__.a = function useApolloFormCtx() {
            return Object(react__WEBPACK_IMPORTED_MODULE_0__.useContext)(
               _utils_FormContext__WEBPACK_IMPORTED_MODULE_1__.a,
            );
         };
      },
      32: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__(202);
         var react = __webpack_require__(0),
            react_default = __webpack_require__.n(react),
            useApolloFormCtx = __webpack_require__(31);
         var objectWithoutProperties = __webpack_require__(79),
            useField = __webpack_require__(96);
         var field_Field = function Field(props) {
            var children = props.children,
               fieldProps = Object(objectWithoutProperties.a)(props, ['children']),
               form = Object(useApolloFormCtx.a)(),
               field = Object(useField.a)(fieldProps);
            return react_default.a.createElement(
               react_default.a.Fragment,
               null,
               children({ field: field, form: form }),
            );
         };
         __webpack_require__(255);
         var useFieldArray = __webpack_require__(155);
         var objectSpread2 = __webpack_require__(26),
            toConsumableArray = __webpack_require__(124),
            slicedToArray = __webpack_require__(43),
            classCallCheck = __webpack_require__(116),
            createClass = __webpack_require__(158),
            cloneDeep = __webpack_require__(109),
            cloneDeep_default = __webpack_require__.n(cloneDeep),
            isEqual = __webpack_require__(87),
            isEqual_default = __webpack_require__.n(isEqual),
            utils = __webpack_require__(57),
            createForOfIteratorHelper = __webpack_require__(484),
            merge = __webpack_require__(485),
            merge_default = __webpack_require__.n(merge),
            lodash_get = __webpack_require__(139),
            get_default = __webpack_require__.n(lodash_get),
            lodash_set = __webpack_require__(486),
            set_default = __webpack_require__.n(lodash_set),
            managers_FormManipulator = (function() {
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
                           allTouched &&
                              (state.touches = Object(utils.d)(state.touches, state.errors, !0));
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
                                            submitCount: state.submitCount,
                                         }),
                                      )
                                    : Object.assign(
                                         state,
                                         Object(objectSpread2.a)({}, this.defaultState, {
                                            values: getState,
                                            errors: this.initialErrors,
                                            touches: this.initialTouches,
                                            submitCount: state.submitCount,
                                         }),
                                      )
                                 : Object.assign(
                                      state,
                                      Object(objectSpread2.a)({}, this.defaultState, {
                                         values: this.initialState,
                                         errors: this.initialErrors,
                                         touches: this.initialTouches,
                                         submitCount: state.submitCount,
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
            defineProperty = __webpack_require__(263),
            inherits = __webpack_require__(498),
            createSuper = __webpack_require__(497),
            managers_ApolloManager = (function(_BaseManager) {
               Object(inherits.a)(ApolloManager, _BaseManager);
               var _super = Object(createSuper.a)(ApolloManager);
               function ApolloManager(name, client) {
                  var _this;
                  return (
                     Object(classCallCheck.a)(this, ApolloManager),
                     ((_this = _super.call(this)).apolloClient = void 0),
                     (_this.query = void 0),
                     (_this.name = void 0),
                     (_this.name = name),
                     (_this.query = _this.getQuery()),
                     (_this.apolloClient = client),
                     _this
                  );
               }
               return (
                  Object(createClass.a)(ApolloManager, [
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
                           var data = null;
                           try {
                              data = this.apolloClient.readQuery({ query: this.query });
                           } catch (e) {}
                           return (data || {})[this.name];
                        },
                     },
                     {
                        key: 'watch',
                        value: function watch(selector, handler) {
                           var _this2 = this,
                              rawState = this.get(),
                              state = rawState || null,
                              previous = selector && state ? selector(state) : state;
                           return this.apolloClient.cache.watch({
                              query: this.query,
                              callback: function callback(_ref) {
                                 var s = _ref.result[_this2.name];
                                 if (s) {
                                    var v = selector ? selector(s) : s;
                                    isEqual_default()(previous, v) || ((previous = v), handler(v));
                                 }
                              },
                              optimistic: !1,
                           });
                        },
                     },
                     {
                        key: 'getQuery',
                        value: function getQuery() {
                           return Object(utils.c)(this.name);
                        },
                     },
                  ]),
                  ApolloManager
               );
            })(function BaseManager() {
               Object(classCallCheck.a)(this, BaseManager);
            }),
            defaultState = {
               errors: {},
               touches: {},
               isValid: !0,
               loading: !1,
               existsChanges: !1,
               isSubmitted: !1,
               focused: null,
               submitCount: 0,
            },
            managers_FormManager = (function() {
               function FormManager(props) {
                  var _this = this;
                  Object(classCallCheck.a)(this, FormManager),
                     (this.name = void 0),
                     (this.manipulator = void 0),
                     (this.customValidators = {}),
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
                     (this.manager = void 0),
                     (this.name = props.name),
                     (this.manager = new managers_ApolloManager(props.name, props.apolloClient)),
                     (this.validateHandler = props.validate),
                     (this.query = this.getQuery()),
                     (this.onChange = props.onChange),
                     (this.onSubmit = props.onSubmit),
                     (this.validationSchema = props.validationSchema),
                     (this.validateOnMount = props.validateOnMount || !1),
                     (this.resetOnSubmit = props.resetOnSubmit || !1),
                     (this.initialState = cloneDeep_default()(props.initialState)),
                     (this.initialErrors = cloneDeep_default()(props.initialErrors) || {}),
                     (this.initialTouches = cloneDeep_default()(props.initialTouches) || {}),
                     (this.manipulator = new managers_FormManipulator(
                        Object(objectSpread2.a)({}, props, {
                           defaultState: defaultState,
                           initialTouches: this.initialTouches,
                           initialErrors: this.initialErrors,
                           customValidators: this.customValidators,
                        }),
                     )),
                     this.manager.get() ||
                        this.set(
                           Object(objectSpread2.a)({}, defaultState, {
                              values: this.initialState,
                              errors: this.initialErrors,
                              touches: this.initialTouches,
                           }),
                        ),
                     this.validate(this.validateOnMount),
                     setTimeout(function() {
                        _this.validate(_this.validateOnMount), props.onInit && props.onInit(_this);
                     });
               }
               return (
                  Object(createClass.a)(FormManager, [
                     {
                        key: 'set',
                        value: function set(state) {
                           return this.manager.set(state);
                        },
                     },
                     {
                        key: 'get',
                        value: function get() {
                           var data = this.manager.get();
                           return (
                              data ||
                                 (this.manager.set(
                                    Object(objectSpread2.a)({}, defaultState, {
                                       values: this.initialState,
                                       errors: this.initialErrors,
                                       touches: this.initialTouches,
                                    }),
                                 ),
                                 (data = this.manager.get())),
                              cloneDeep_default()(data)
                           );
                        },
                     },
                     {
                        key: 'exists',
                        value: function exists() {
                           try {
                              var data = this.manager.get();
                              return Boolean(data);
                           } catch (e) {
                              return !1;
                           }
                        },
                     },
                     {
                        key: 'useState',
                        value: function useState() {
                           var _this2 = this,
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
                              fullState = this.get(),
                              _React$useState = react_default.a.useState(
                                 selector ? selector(fullState) : fullState,
                              ),
                              _React$useState2 = Object(slicedToArray.a)(_React$useState, 2),
                              state = _React$useState2[0],
                              setState = _React$useState2[1];
                           return (
                              react_default.a.useEffect(function() {
                                 return _this2.watch(selector, function(s) {
                                    return setState(s);
                                 });
                              }, [selector, setState, this.query].concat(
                                 Object(toConsumableArray.a)(dependencies),
                              )),
                              state
                           );
                        },
                     },
                     {
                        key: 'watch',
                        value: function watch(selector, handler) {
                           return this.manager.watch(selector, handler);
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
                           var prev = Object(objectSpread2.a)({}, this.get());
                           isEqual_default()(this.initialState, prev.values) ||
                              (prev.existsChanges = !0),
                              this.set(Object(objectSpread2.a)({}, prev, { values: values })),
                              this.onChange &&
                                 this.onChange(values, prev.values, this, { type: 'all' });
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
                           var state = this.get(),
                              prevValues = cloneDeep_default()(state.values);
                           return (
                              Object(utils.b)(state.touches, key) ||
                                 this.manipulator.setTouched(state, key, !0),
                              this.manipulator.setValue(state, key, newValue),
                              this.manipulator.validate(state, !1),
                              isEqual_default()(this.initialState, state.values)
                                 ? (state.existsChanges = !1)
                                 : (state.existsChanges = !0),
                              this.set(state),
                              this.onChange &&
                                 this.onChange(state.values, prevValues, this, {
                                    type: 'field',
                                    value: key,
                                 }),
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
                                   state.submitCount++,
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
                              (state.responseMessage = void 0),
                              (this.initialState = state.values),
                              this.set(state);
                        },
                     },
                     {
                        key: 'responseMessage',
                        value: function responseMessage(message) {
                           var state = this.get();
                           (state.responseMessage = message), this.set(state);
                        },
                     },
                     {
                        key: 'getQuery',
                        value: function getQuery() {
                           return this.manager.getQuery();
                        },
                     },
                     {
                        key: 'getInitialState',
                        value: function getInitialState() {
                           return this.initialState;
                        },
                     },
                     {
                        key: 'renewOnChange',
                        value: function renewOnChange(handler) {
                           this.onChange = handler;
                        },
                     },
                     {
                        key: 'renewOnSubmit',
                        value: function renewOnSubmit(handler) {
                           this.onSubmit = handler;
                        },
                     },
                  ]),
                  FormManager
               );
            })(),
            _apollo_client = __webpack_require__(72);
         var hooks_useApolloForm = function useApolloForm(_ref) {
            var resetOnUnmount = _ref.resetOnUnmount,
               saveOnUnmount = _ref.saveOnUnmount,
               enableReinitialize = _ref.enableReinitialize,
               initialState = _ref.initialState,
               props = Object(objectWithoutProperties.a)(_ref, [
                  'resetOnUnmount',
                  'saveOnUnmount',
                  'enableReinitialize',
                  'initialState',
               ]),
               mountedRef = react_default.a.useRef(!1),
               apolloClient = Object(_apollo_client.useApolloClient)(),
               manager = react_default.a.useMemo(function() {
                  return new managers_FormManager(
                     Object(objectSpread2.a)({}, props, {
                        initialState: initialState,
                        apolloClient: apolloClient,
                     }),
                  );
               }, []);
            return (
               enableReinitialize &&
                  'undefined' == typeof window &&
                  (isEqual_default()(manager.get().values, initialState) ||
                     manager.reset(initialState)),
               react_default.a.useEffect(
                  function() {
                     enableReinitialize &&
                        mountedRef.current &&
                        (manager.get() &&
                           (isEqual_default()(manager.getInitialState(), initialState) ||
                              manager.reset(initialState)));
                     mountedRef.current = !0;
                  },
                  [initialState, mountedRef, enableReinitialize],
               ),
               react_default.a.useEffect(
                  function() {
                     return function() {
                        saveOnUnmount
                           ? resetOnUnmount && manager.exists() && manager.reset()
                           : apolloClient.cache.evict({
                                id: 'ROOT_QUERY',
                                fieldName: manager.name,
                             });
                     };
                  },
                  [resetOnUnmount, saveOnUnmount, manager],
               ),
               react_default.a.useEffect(
                  function() {
                     manager.renewOnChange(props.onChange);
                  },
                  [props.onChange],
               ),
               react_default.a.useEffect(
                  function() {
                     manager.renewOnSubmit(props.onSubmit);
                  },
                  [props.onSubmit],
               ),
               manager
            );
         };
         __webpack_require__(159);
         var utils_ResponseMessage = function ResponseMessage(props) {
            var apolloForm = Object(useApolloFormCtx.a)(),
               responseMessage = apolloForm.useState(function(s) {
                  return s.responseMessage;
               }),
               existsChanges = apolloForm.useState(function(s) {
                  return s.existsChanges;
               }),
               Component =
                  props.children ||
                  function(_ref) {
                     var error = _ref.error;
                     return react_default.a.createElement('span', null, error);
                  },
               error = existsChanges ? void 0 : responseMessage;
            return error
               ? react_default.a.createElement(Component, { error: error })
               : react_default.a.createElement(react_default.a.Fragment, null);
         };
         var Submit = __webpack_require__(256),
            FormContext = (__webpack_require__(257), __webpack_require__(154));
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
            query = __webpack_require__(251);
         __webpack_require__(258),
            __webpack_require__(153),
            __webpack_require__(136),
            __webpack_require__(137);
         __webpack_require__.d(__webpack_exports__, 'a', function() {
            return src_ApolloForm;
         }),
            __webpack_require__.d(__webpack_exports__, 'f', function() {
               return useFieldArray.a;
            }),
            __webpack_require__.d(__webpack_exports__, 'b', function() {
               return field_Field;
            }),
            __webpack_require__.d(__webpack_exports__, 'c', function() {
               return utils_ResponseMessage;
            }),
            __webpack_require__.d(__webpack_exports__, 'd', function() {
               return Submit.a;
            }),
            __webpack_require__.d(__webpack_exports__, 'e', function() {
               return query.a;
            });
      },
      515: function(module, exports, __webpack_require__) {
         __webpack_require__(516),
            __webpack_require__(662),
            __webpack_require__(663),
            (module.exports = __webpack_require__(857));
      },
      57: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.d(__webpack_exports__, 'd', function() {
            return replaceErrors;
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
         var lodash_isDate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(336),
            lodash_isDate__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               lodash_isDate__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(251);
         function replaceErrors(target, source, value) {
            for (var _i = 0, _Object$keys = Object.keys(source); _i < _Object$keys.length; _i++) {
               var _key = _Object$keys[_i];
               if (
                  'object' != typeof source[_key] ||
                  null === source[_key] ||
                  lodash_isDate__WEBPACK_IMPORTED_MODULE_0___default()(value)
               )
                  target[_key] = value;
               else if (Array.isArray(source[_key])) {
                  if (null !== source[_key][1] && void 0 !== source[_key][1]) {
                     ('object' == typeof target[_key] && null !== target[_key]) ||
                        (target[_key] = {});
                     var t = Array.isArray(target[_key]) ? target[_key][1] : target[_key];
                     target[_key] = [!0, replaceErrors(t || {}, source[_key][1], !0)];
                  }
               } else
                  ('object' == typeof target[_key] && null !== target[_key]) || (target[_key] = {}),
                     source[_key] &&
                        (target[_key] = replaceErrors(target[_key] || {}, source[_key], !0));
            }
            return target;
         }
         function firstError(state) {
            for (var k in state) {
               var item = state[k];
               if (
                  (Array.isArray(state[k]) && (item = state[k][1]),
                  'object' != typeof item ||
                     lodash_isDate__WEBPACK_IMPORTED_MODULE_0___default()(item))
               )
                  return item;
               var err = firstError(item);
               if (err) return err;
            }
         }
         function getDeepStatus(state, path) {
            for (
               var arr = path.split('.'), last = arr[arr.length - 1], current = state, i = 0;
               i < arr.length - 1;
               i++
            ) {
               var _key2 = arr[i];
               void 0 === current[_key2] &&
                  (i === arr.length - 1 ? (current[_key2] = {}) : (current[_key2] = [void 0, {}])),
                  'object' == typeof current[_key2]
                     ? (current = Array.isArray(current[_key2])
                          ? current[_key2][1]
                          : current[_key2])
                     : (current[_key2] = [current[_key2], {}]);
            }
            return void 0 === current
               ? current
               : 'object' == typeof current[last]
               ? Array.isArray(current[last])
                  ? current[last][0]
                  : void (current[last] = [void 0, current[last]])
               : current[last];
         }
         function setDeepStatus(state, path, value) {
            for (
               var arr = path.split('.'), last = arr[arr.length - 1], current = state, i = 0;
               i < arr.length - 1;
               i++
            ) {
               var _key3 = arr[i];
               if (
                  (void 0 === current[_key3] &&
                     (i === arr.length - 1
                        ? (current[_key3] = {})
                        : (current[_key3] = [void 0, {}])),
                  'object' == typeof current[_key3])
               )
                  current = Array.isArray(current[_key3]) ? current[_key3][1] : current[_key3];
               else {
                  var t = current[_key3];
                  (current[_key3] = [t, {}]), (current = current[_key3][1]);
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
      580: function(module, exports) {},
      663: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            __webpack_require__.d(__webpack_exports__, 'client', function() {
               return client;
            });
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _storybook_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(162),
            _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(479),
            _apollo_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(72),
            _apollo_client_cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(86);
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
      80: function(module, __webpack_exports__, __webpack_require__) {
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
               43,
            ),
            react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_1__,
            ),
            react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1097),
            react_syntax_highlighter_dist_esm_styles_hljs_ocean__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
               493,
            ),
            _src__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(32),
            _apollo_client__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(72),
            _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(81);
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
                  Object(_src__WEBPACK_IMPORTED_MODULE_4__.e)(props.name),
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
      857: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            function(module) {
               var _storybook_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(162);
               (module._StorybookPreserveDecorators = !0),
                  Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)(
                     [__webpack_require__(858)],
                     module,
                  );
            }.call(this, __webpack_require__(200)(module));
      },
      858: function(module, exports, __webpack_require__) {
         var map = {
            './example.stories.tsx': 859,
            './gallery.stories.tsx': 1083,
            './signin.stories.tsx': 1084,
            './todo-list.stories.tsx': 1085,
            './with-confirm.stories.tsx': 1086,
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
            (webpackContext.id = 858);
      },
      859: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            __webpack_require__.d(__webpack_exports__, 'Example', function() {
               return Example;
            });
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               62,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               26,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
               97,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
               43,
            ),
            react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0),
            _src__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(32),
            yup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(58),
            _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(500),
            _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7),
            _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(52),
            _src_utils_ErrorMessage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(159),
            _src_utils_Submit__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(256),
            _src_consumers_FormConsumer__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(202),
            _src_field_FieldArray__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(255),
            _material_ui_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(81),
            _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(101),
            _utils__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(80),
            addSourceDecorator =
               (__webpack_require__(95).withSource, __webpack_require__(95).addSource);
         __webpack_exports__.default = {
            parameters: {
               storySource: {
                  source:
                     "import * as React from 'react';\nimport { ApolloForm, Field, FieldValidator, FormErrors } from '../src';\nimport * as Yup from 'yup';\nimport TextField from '@material-ui/core/TextField';\nimport Grid from '@material-ui/core/Grid';\nimport Button from '@material-ui/core/Button';\nimport ErrorMessage from '../src/utils/ErrorMessage';\nimport Submit from '../src/utils/Submit';\nimport FormConsumer from '../src/consumers/FormConsumer';\nimport FieldArray from '../src/field/FieldArray';\nimport { Paper } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport { PreviewState } from './utils';\n\nexport default {\n   title: 'Components',\n};\n\nconst validationSchema = Yup.object().shape({\n   email: Yup.string()\n      .required()\n      .max(5),\n   password: Yup.string()\n      .required()\n      .max(3),\n   deep: Yup.object().shape({\n      one: Yup.string()\n         .required()\n         .max(2),\n   }),\n   arr: Yup.array()\n      .of(\n         Yup.string()\n            .required()\n            .max(3),\n      )\n      .min(3)\n      .test('arr', 'Not length equal 2 words', arr => {\n         return !(arr.filter((el: string) => el.length === 2).length > 0);\n      }),\n});\n\nfunction FormTextField(props: { name: string; validate?: FieldValidator<string>; label: string }) {\n   return (\n      <Field<string> name={props.name} validate={props.validate}>\n         {({ field }) => {\n            const err = Boolean(field.touched && field.error);\n            // console.log('render ' + props.name);\n\n            return (\n               <TextField\n                  value={field.value}\n                  onChange={e => field.setFieldValue(e.target.value)}\n                  onBlur={() => field.setFieldTouched(true)}\n                  helperText={err ? field.error : undefined}\n                  error={Boolean(field.touched && field.error)}\n                  label={props.label}\n               />\n            );\n         }}\n      </Field>\n   );\n}\n\nfunction FormTextFieldArray(props: { name: string; validate: FieldValidator<string[]> }) {\n   return (\n      <Paper style={{ padding: 24 }}>\n         <Grid container spacing={2}>\n            <Grid item xs={12}>\n               <Typography>Example deep array fields</Typography>\n            </Grid>\n            <FieldArray<string> name={props.name} validate={props.validate}>\n               {({ field }) => {\n                  return (\n                     <>\n                        {field.value.map((el, i) => {\n                           return (\n                              <Grid item xs={3} key={'arr-field' + i}>\n                                 <FormTextField\n                                    key={'test' + i}\n                                    name={props.name + '.' + i}\n                                    label={props.name + '.' + i}\n                                 />\n                              </Grid>\n                           );\n                        })}\n\n                        <Grid item xs={3} style={{ display: 'flex', alignItems: 'flex-end' }}>\n                           <Button\n                              variant='contained'\n                              onClick={() => field.push((field.value.length + 1).toString())}\n                           >\n                              push\n                           </Button>\n                           <Button\n                              variant='contained'\n                              onClick={() => field.pop()}\n                              style={{ marginLeft: 16 }}\n                           >\n                              pop\n                           </Button>\n                        </Grid>\n                     </>\n                  );\n               }}\n            </FieldArray>\n         </Grid>\n      </Paper>\n   );\n}\n\ntype FormState = {\n   email: string;\n   password: string;\n   deep: { one: string; two: { test: string } };\n   arr: string[];\n};\n\nexport function Example() {\n   const [initialState, setState] = React.useState<FormState>({\n      email: '1',\n      password: '',\n      deep: { one: '1', two: { test: '2' } },\n      arr: ['', '2', '31'],\n   });\n\n   return (\n      <ApolloForm<FormState>\n         name='example'\n         saveOnUnmount\n         initialState={initialState}\n         validationSchema={validationSchema}\n         validate={({ values }) => {\n            const errors: FormErrors<FormState> = {};\n\n            if (values.email === '12') {\n               errors.email = 'Not 12';\n            }\n            if (false) {\n               // example deep errors\n               errors.deep = ['deep error', { one: 'deep oen error', two: [undefined, 'error'] }];\n            }\n\n            return errors;\n         }}\n         onSubmit={async ({ values }, form) => {\n            await wait(1000);\n            console.log('submit', values);\n            form.reset({\n               ...values,\n               email: 'Reseted',\n            });\n         }}\n         onChange={(state, form) => console.log('Values: ', state)}\n      >\n         <Grid container spacing={2}>\n            <Grid item xs={8}>\n               <Grid container spacing={2}>\n                  <Grid item xs={12}>\n                     <Paper style={{ padding: 24 }}>\n                        <Grid container spacing={2}>\n                           <Grid item xs={12}>\n                              <Typography>Example basic fields</Typography>\n                           </Grid>\n                           <Grid item xs={6}>\n                              <FormTextField\n                                 name='email'\n                                 label='email'\n                                 validate={v => {\n                                    if (v.length === 1) {\n                                       return 'custom error';\n                                    }\n                                 }}\n                              />\n                           </Grid>\n                           <Grid item xs={6}>\n                              <FormTextField name='password' label='password' />\n                           </Grid>\n                        </Grid>\n                     </Paper>\n                  </Grid>\n                  <Grid item xs={12}>\n                     <Paper style={{ padding: 24 }}>\n                        <Grid container spacing={2}>\n                           <Grid item xs={12}>\n                              <Typography>Example deep object fields</Typography>\n                           </Grid>\n                           <Grid item xs={6}>\n                              <FormTextField name='deep.one' label='deep.one' />\n                           </Grid>\n                           <Grid item xs={6}>\n                              <FormTextField name='deep.two.test' label='deep.two.test' />\n                           </Grid>\n                        </Grid>\n                     </Paper>\n                  </Grid>\n                  <Grid item xs={12}>\n                     <FormTextFieldArray\n                        name='arr'\n                        validate={arr => {\n                           if (arr.filter(el => el.length === 0).length !== 0) {\n                              return 'not empty in arr';\n                           }\n                        }}\n                     />\n                  </Grid>\n                  <Grid item xs={12}>\n                     <Paper style={{ padding: 24 }}>\n                        <Grid container spacing={2}>\n                           <Grid item xs={12}>\n                              <Typography>Example actions</Typography>\n                           </Grid>\n                           <Grid item>\n                              <FormConsumer>\n                                 {({ form }) => (\n                                    <Button variant='contained' onClick={() => form.reset()}>\n                                       RESET\n                                    </Button>\n                                 )}\n                              </FormConsumer>\n                           </Grid>\n                           <Grid item>\n                              <FormConsumer>\n                                 {({ form }) => (\n                                    <Button variant='contained' onClick={() => form.validate(true)}>\n                                       VALIDATE\n                                    </Button>\n                                 )}\n                              </FormConsumer>\n                           </Grid>\n                           <Grid item>\n                              <Submit>\n                                 {({ disabled }) => (\n                                    <Button variant='contained' type='submit' disabled={disabled}>\n                                       Submit\n                                    </Button>\n                                 )}\n                              </Submit>\n                           </Grid>\n                        </Grid>\n                     </Paper>\n                  </Grid>\n                  <Grid item xs={12}>\n                     <Paper style={{ padding: 24 }}>\n                        <Grid container spacing={2}>\n                           <Grid item xs={3}>\n                              <ErrorMessage\n                                 name='password'\n                                 children={({ error }) => (\n                                    <span>\n                                       password error: (<b style={{ color: 'red' }}>{error}</b>)\n                                    </span>\n                                 )}\n                              />\n                           </Grid>\n                           <Grid item xs={3}>\n                              <ErrorMessage\n                                 name='arr'\n                                 children={({ error }) => (\n                                    <span>\n                                       arr error: (<b style={{ color: 'red' }}>{error}</b>)\n                                    </span>\n                                 )}\n                              />\n                           </Grid>\n                           <Grid item xs={3}>\n                              <ErrorMessage\n                                 name='arr.0'\n                                 children={({ error }) => (\n                                    <span>\n                                       arr.0 error: (<b style={{ color: 'red' }}>{error}</b>)\n                                    </span>\n                                 )}\n                              />\n                           </Grid>\n                        </Grid>\n                     </Paper>\n                  </Grid>\n               </Grid>\n            </Grid>\n            <Grid item xs={4}>\n               <PreviewState name='example' />\n            </Grid>\n         </Grid>\n      </ApolloForm>\n   );\n}\n\nfunction wait(time: number) {\n   return new Promise(resolve => setTimeout(resolve, time));\n}\n",
                  locationsMap: {
                     'components--example': {
                        startLoc: { col: 7, line: 119 },
                        endLoc: { col: 1, line: 287 },
                        startBody: { col: 7, line: 119 },
                        endBody: { col: 1, line: 287 },
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
                     saveOnUnmount: !0,
                     initialState: initialState,
                     validationSchema: validationSchema,
                     validate: function validate(_ref3) {
                        var errors = {};
                        return '12' === _ref3.values.email && (errors.email = 'Not 12'), errors;
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
                                             var disabled = _ref8.disabled;
                                             return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                                _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_9__.a,
                                                {
                                                   variant: 'contained',
                                                   type: 'submit',
                                                   disabled: disabled,
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
                  "import * as React from 'react';\nimport { ApolloForm, Field, FieldValidator, FormErrors } from '../src';\nimport * as Yup from 'yup';\nimport TextField from '@material-ui/core/TextField';\nimport Grid from '@material-ui/core/Grid';\nimport Button from '@material-ui/core/Button';\nimport ErrorMessage from '../src/utils/ErrorMessage';\nimport Submit from '../src/utils/Submit';\nimport FormConsumer from '../src/consumers/FormConsumer';\nimport FieldArray from '../src/field/FieldArray';\nimport { Paper } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport { PreviewState } from './utils';\n\nexport default {\n   title: 'Components',\n};\n\nconst validationSchema = Yup.object().shape({\n   email: Yup.string()\n      .required()\n      .max(5),\n   password: Yup.string()\n      .required()\n      .max(3),\n   deep: Yup.object().shape({\n      one: Yup.string()\n         .required()\n         .max(2),\n   }),\n   arr: Yup.array()\n      .of(\n         Yup.string()\n            .required()\n            .max(3),\n      )\n      .min(3)\n      .test('arr', 'Not length equal 2 words', arr => {\n         return !(arr.filter((el: string) => el.length === 2).length > 0);\n      }),\n});\n\nfunction FormTextField(props: { name: string; validate?: FieldValidator<string>; label: string }) {\n   return (\n      <Field<string> name={props.name} validate={props.validate}>\n         {({ field }) => {\n            const err = Boolean(field.touched && field.error);\n            // console.log('render ' + props.name);\n\n            return (\n               <TextField\n                  value={field.value}\n                  onChange={e => field.setFieldValue(e.target.value)}\n                  onBlur={() => field.setFieldTouched(true)}\n                  helperText={err ? field.error : undefined}\n                  error={Boolean(field.touched && field.error)}\n                  label={props.label}\n               />\n            );\n         }}\n      </Field>\n   );\n}\n\nfunction FormTextFieldArray(props: { name: string; validate: FieldValidator<string[]> }) {\n   return (\n      <Paper style={{ padding: 24 }}>\n         <Grid container spacing={2}>\n            <Grid item xs={12}>\n               <Typography>Example deep array fields</Typography>\n            </Grid>\n            <FieldArray<string> name={props.name} validate={props.validate}>\n               {({ field }) => {\n                  return (\n                     <>\n                        {field.value.map((el, i) => {\n                           return (\n                              <Grid item xs={3} key={'arr-field' + i}>\n                                 <FormTextField\n                                    key={'test' + i}\n                                    name={props.name + '.' + i}\n                                    label={props.name + '.' + i}\n                                 />\n                              </Grid>\n                           );\n                        })}\n\n                        <Grid item xs={3} style={{ display: 'flex', alignItems: 'flex-end' }}>\n                           <Button\n                              variant='contained'\n                              onClick={() => field.push((field.value.length + 1).toString())}\n                           >\n                              push\n                           </Button>\n                           <Button\n                              variant='contained'\n                              onClick={() => field.pop()}\n                              style={{ marginLeft: 16 }}\n                           >\n                              pop\n                           </Button>\n                        </Grid>\n                     </>\n                  );\n               }}\n            </FieldArray>\n         </Grid>\n      </Paper>\n   );\n}\n\ntype FormState = {\n   email: string;\n   password: string;\n   deep: { one: string; two: { test: string } };\n   arr: string[];\n};\n\nexport function Example() {\n   const [initialState, setState] = React.useState<FormState>({\n      email: '1',\n      password: '',\n      deep: { one: '1', two: { test: '2' } },\n      arr: ['', '2', '31'],\n   });\n\n   return (\n      <ApolloForm<FormState>\n         name='example'\n         saveOnUnmount\n         initialState={initialState}\n         validationSchema={validationSchema}\n         validate={({ values }) => {\n            const errors: FormErrors<FormState> = {};\n\n            if (values.email === '12') {\n               errors.email = 'Not 12';\n            }\n            if (false) {\n               // example deep errors\n               errors.deep = ['deep error', { one: 'deep oen error', two: [undefined, 'error'] }];\n            }\n\n            return errors;\n         }}\n         onSubmit={async ({ values }, form) => {\n            await wait(1000);\n            console.log('submit', values);\n            form.reset({\n               ...values,\n               email: 'Reseted',\n            });\n         }}\n         onChange={(state, form) => console.log('Values: ', state)}\n      >\n         <Grid container spacing={2}>\n            <Grid item xs={8}>\n               <Grid container spacing={2}>\n                  <Grid item xs={12}>\n                     <Paper style={{ padding: 24 }}>\n                        <Grid container spacing={2}>\n                           <Grid item xs={12}>\n                              <Typography>Example basic fields</Typography>\n                           </Grid>\n                           <Grid item xs={6}>\n                              <FormTextField\n                                 name='email'\n                                 label='email'\n                                 validate={v => {\n                                    if (v.length === 1) {\n                                       return 'custom error';\n                                    }\n                                 }}\n                              />\n                           </Grid>\n                           <Grid item xs={6}>\n                              <FormTextField name='password' label='password' />\n                           </Grid>\n                        </Grid>\n                     </Paper>\n                  </Grid>\n                  <Grid item xs={12}>\n                     <Paper style={{ padding: 24 }}>\n                        <Grid container spacing={2}>\n                           <Grid item xs={12}>\n                              <Typography>Example deep object fields</Typography>\n                           </Grid>\n                           <Grid item xs={6}>\n                              <FormTextField name='deep.one' label='deep.one' />\n                           </Grid>\n                           <Grid item xs={6}>\n                              <FormTextField name='deep.two.test' label='deep.two.test' />\n                           </Grid>\n                        </Grid>\n                     </Paper>\n                  </Grid>\n                  <Grid item xs={12}>\n                     <FormTextFieldArray\n                        name='arr'\n                        validate={arr => {\n                           if (arr.filter(el => el.length === 0).length !== 0) {\n                              return 'not empty in arr';\n                           }\n                        }}\n                     />\n                  </Grid>\n                  <Grid item xs={12}>\n                     <Paper style={{ padding: 24 }}>\n                        <Grid container spacing={2}>\n                           <Grid item xs={12}>\n                              <Typography>Example actions</Typography>\n                           </Grid>\n                           <Grid item>\n                              <FormConsumer>\n                                 {({ form }) => (\n                                    <Button variant='contained' onClick={() => form.reset()}>\n                                       RESET\n                                    </Button>\n                                 )}\n                              </FormConsumer>\n                           </Grid>\n                           <Grid item>\n                              <FormConsumer>\n                                 {({ form }) => (\n                                    <Button variant='contained' onClick={() => form.validate(true)}>\n                                       VALIDATE\n                                    </Button>\n                                 )}\n                              </FormConsumer>\n                           </Grid>\n                           <Grid item>\n                              <Submit>\n                                 {({ disabled }) => (\n                                    <Button variant='contained' type='submit' disabled={disabled}>\n                                       Submit\n                                    </Button>\n                                 )}\n                              </Submit>\n                           </Grid>\n                        </Grid>\n                     </Paper>\n                  </Grid>\n                  <Grid item xs={12}>\n                     <Paper style={{ padding: 24 }}>\n                        <Grid container spacing={2}>\n                           <Grid item xs={3}>\n                              <ErrorMessage\n                                 name='password'\n                                 children={({ error }) => (\n                                    <span>\n                                       password error: (<b style={{ color: 'red' }}>{error}</b>)\n                                    </span>\n                                 )}\n                              />\n                           </Grid>\n                           <Grid item xs={3}>\n                              <ErrorMessage\n                                 name='arr'\n                                 children={({ error }) => (\n                                    <span>\n                                       arr error: (<b style={{ color: 'red' }}>{error}</b>)\n                                    </span>\n                                 )}\n                              />\n                           </Grid>\n                           <Grid item xs={3}>\n                              <ErrorMessage\n                                 name='arr.0'\n                                 children={({ error }) => (\n                                    <span>\n                                       arr.0 error: (<b style={{ color: 'red' }}>{error}</b>)\n                                    </span>\n                                 )}\n                              />\n                           </Grid>\n                        </Grid>\n                     </Paper>\n                  </Grid>\n               </Grid>\n            </Grid>\n            <Grid item xs={4}>\n               <PreviewState name='example' />\n            </Grid>\n         </Grid>\n      </ApolloForm>\n   );\n}\n\nfunction wait(time: number) {\n   return new Promise(resolve => setTimeout(resolve, time));\n}\n",
               __ADDS_MAP__: {
                  'components--example': {
                     startLoc: { col: 7, line: 119 },
                     endLoc: { col: 1, line: 287 },
                     startBody: { col: 7, line: 119 },
                     endBody: { col: 1, line: 287 },
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
      96: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
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
   },
   [[515, 1, 2]],
]);
//# sourceMappingURL=main.0defd3a93623e106fb33.bundle.js.map