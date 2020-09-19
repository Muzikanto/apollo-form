(window.webpackJsonp = window.webpackJsonp || []).push([
   [0],
   {
      1008: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            __webpack_require__.d(__webpack_exports__, 'TodoList', function() {
               return TodoList;
            });
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               93,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               94,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = __webpack_require__.n(
               _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
               134,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
               70,
            ),
            yup__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(50),
            _src__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(62),
            react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(0),
            _material_ui_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(12),
            _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(293),
            _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(233),
            _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(77),
            _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
               436,
            ),
            _utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(229),
            _apollo_client__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(76),
            _material_ui_core_Chip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1019),
            addSourceDecorator =
               (__webpack_require__(129).withSource, __webpack_require__(129).addSource);
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
      104: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);
         __webpack_exports__.a = function useField(props) {
            var apolloForm = Object(_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__.a)(),
               value = apolloForm.useValue(props.name),
               error = apolloForm.useError(props.name),
               touched = apolloForm.useTouched(props.name),
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
                  setFieldValue: setFieldValue,
                  setFieldError: setFieldError,
                  setFieldTouched: setFieldTouched,
               }
            );
         };
      },
      130: function(module, exports) {},
      131: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            FormContext = __webpack_require__
               .n(react__WEBPACK_IMPORTED_MODULE_0__)
               .a.createContext({});
         __webpack_exports__.a = FormContext;
      },
      132: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               35,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               145,
            ),
            _useField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(104);
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
      136: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);
         __webpack_exports__.a = function StateConsumer(_ref) {
            var Render = _ref.children,
               selector = _ref.selector,
               state = Object(_hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__.a)().useState(
                  selector,
               );
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Render, {
               state: state,
            });
         };
      },
      170: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);
         __webpack_exports__.a = function FormConsumer(_ref) {
            var Render = _ref.children,
               form = Object(_hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__.a)();
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Render, {
               form: form,
            });
         };
      },
      171: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);
         __webpack_exports__.a = function ErrorMessage(props) {
            var apolloForm = Object(_hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__.a)(),
               error = apolloForm.useError(props.name),
               touched = apolloForm.useTouched(props.name),
               Component =
                  props.children ||
                  function(_ref) {
                     return _ref.error;
                  };
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, {
               error: (props.ignoreTouched ? error : error && touched) && error,
            });
         };
      },
      214: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               70,
            ),
            _hooks_useFieldArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(132),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(38);
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
      215: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);
         __webpack_exports__.a = function FormLoader(props) {
            var Component = props.children,
               state = Object(_hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__.a)().useState(
                  function(s) {
                     return s.loading;
                  },
               );
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, {
               loading: state,
            });
         };
      },
      216: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(38);
         __webpack_exports__.a = function Submit(props) {
            var Component = props.children;
            if (!Component) throw new Error('Require component or children func');
            var state = Object(_hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__.a)().useState(),
               isValid = state.isValid,
               loading = state.loading,
               existsChanges = state.existsChanges,
               isSubmitted = state.isSubmitted;
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, {
               disabled: !isValid || loading || !existsChanges,
               isValid: isValid,
               loading: loading,
               existsChanges: existsChanges,
               isSubmitted: isSubmitted,
            });
         };
      },
      229: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.d(__webpack_exports__, 'a', function() {
            return CodeHighlighter;
         });
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1018),
            react_syntax_highlighter_dist_esm_styles_hljs_ocean__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
               435,
            );
         function CodeHighlighter(props) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
               react_syntax_highlighter__WEBPACK_IMPORTED_MODULE_1__.a,
               Object.assign({}, props, {
                  language: 'tsx',
                  style:
                     react_syntax_highlighter_dist_esm_styles_hljs_ocean__WEBPACK_IMPORTED_MODULE_2__.a,
               }),
            );
         }
      },
      38: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            _FormContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(131);
         __webpack_exports__.a = function useApolloFormCtx() {
            return Object(react__WEBPACK_IMPORTED_MODULE_0__.useContext)(
               _FormContext__WEBPACK_IMPORTED_MODULE_1__.a,
            );
         };
      },
      449: function(module, exports, __webpack_require__) {
         __webpack_require__(450),
            __webpack_require__(596),
            __webpack_require__(597),
            (module.exports = __webpack_require__(798));
      },
      514: function(module, exports) {},
      597: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__);
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _storybook_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(139),
            _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(422),
            _apollo_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(76),
            _apollo_client_cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(75);
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
         Object(_storybook_react__WEBPACK_IMPORTED_MODULE_1__.addDecorator)(function(story) {
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(
               _apollo_client__WEBPACK_IMPORTED_MODULE_3__.ApolloProvider,
               { client: client },
               story(),
            );
         });
      },
      62: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__(170), __webpack_require__(136);
         var objectWithoutProperties = __webpack_require__(70),
            useField = __webpack_require__(104),
            useApolloFormCtx = __webpack_require__(38);
         var field_Field = function Field(props) {
               var children = props.children,
                  fieldProps = Object(objectWithoutProperties.a)(props, ['children']),
                  form = Object(useApolloFormCtx.a)();
               return children({ field: Object(useField.a)(fieldProps), form: form });
            },
            react = (__webpack_require__(214), __webpack_require__(0)),
            react_default = __webpack_require__.n(react);
         var useFieldArray = __webpack_require__(132);
         var objectSpread2 = __webpack_require__(35),
            slicedToArray = __webpack_require__(93),
            defineProperty = __webpack_require__(221),
            classCallCheck = __webpack_require__(222),
            createClass = __webpack_require__(223),
            lodash = __webpack_require__(39),
            lodash_default = __webpack_require__.n(lodash),
            createForOfIteratorHelper = __webpack_require__(141),
            taggedTemplateLiteral = __webpack_require__(425),
            client = __webpack_require__(76);
         function _templateObject() {
            var data = Object(taggedTemplateLiteral.a)(['query ApolloForm { ', ' @client }']);
            return (
               (_templateObject = function _templateObject() {
                  return data;
               }),
               data
            );
         }
         var query = function makeApolloFormQuery(name) {
            return Object(client.gql)(_templateObject(), name);
         };
         function objectDeepPairs(source) {
            for (var pairs = lodash_default.a.toPairs(source), i = 0; i < pairs.length; i++) {
               var key = pairs[i][0],
                  value = pairs[i][1];
               if ('object' == typeof value && !lodash_default.a.isDate(value)) {
                  var deepPairs = objectDeepPairs(value);
                  pairs.splice(i, 1);
                  var _step,
                     _iterator = Object(createForOfIteratorHelper.a)(deepPairs);
                  try {
                     for (_iterator.s(); !(_step = _iterator.n()).done; ) {
                        var dp = _step.value;
                        pairs.push([key + '.' + dp[0], dp[1]]);
                     }
                  } catch (err) {
                     _iterator.e(err);
                  } finally {
                     _iterator.f();
                  }
               }
            }
            return pairs;
         }
         function getDeepStatus(state, path, withDefault) {
            var _step2,
               arr = path.split('.'),
               last = arr[arr.length - 1],
               current = state,
               _iterator2 = Object(createForOfIteratorHelper.a)(arr.slice(0, -1));
            try {
               for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                  var key = _step2.value;
                  state[key] || (current[key] = {}),
                     'object' == typeof current[key]
                        ? (current = Array.isArray(current[key]) ? current[key][1] : current[key])
                        : (current[key] = [current[key], {}]);
               }
            } catch (err) {
               _iterator2.e(err);
            } finally {
               _iterator2.f();
            }
            return current
               ? (!current[last] && withDefault && (current[last] = ''),
                 'object' == typeof current[last]
                    ? Array.isArray(current[last])
                       ? current[last][0]
                       : ((current[last] = ['', current[last]]), '')
                    : current[last])
               : '';
         }
         function setDeepStatus(state, path, value) {
            for (
               var arr = path.split('.'), last = arr[arr.length - 1], current = state, i = 0;
               i < arr.length - 1;
               i++
            ) {
               var key = arr[i];
               if (
                  (current[key] ||
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
         var src_FormManipulator = (function() {
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
                           var value = lodash_default.a.get(state.values, key);
                           return (
                              lodash_default.a.isEqual(value, newValue) ||
                                 lodash_default.a.set(state.values, key, newValue),
                              state.existsChanges || (state.existsChanges = !0),
                              state
                           );
                        },
                     },
                     {
                        key: 'setError',
                        value: function setError(state, key, value) {
                           return (
                              getDeepStatus(state.errors, key) !== value &&
                                 setDeepStatus(state.errors, key, value),
                              state
                           );
                        },
                     },
                     {
                        key: 'setTouched',
                        value: function setTouched(state, key, value) {
                           return (
                              getDeepStatus(state.touches, key) !== value &&
                                 setDeepStatus(state.touches, key, value),
                              state
                           );
                        },
                     },
                     {
                        key: 'getValue',
                        value: function getValue(state, key) {
                           return lodash_default.a.get(state.values, key);
                        },
                     },
                     {
                        key: 'getError',
                        value: function getError(state, key) {
                           return getDeepStatus(lodash_default.a.cloneDeep(state.errors), key);
                        },
                     },
                     {
                        key: 'getTouched',
                        value: function getTouched(state, key) {
                           return getDeepStatus(lodash_default.a.cloneDeep(state.touches), key);
                        },
                     },
                     {
                        key: 'validate',
                        value: function validate(state) {
                           var allTouched =
                              arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                           if (((state.errors = {}), this.validateHandler)) {
                              var customErrors = this.validateHandler(state);
                              lodash_default.a.merge(state.errors, customErrors);
                           }
                           for (var _key in this.customValidators)
                              if (!(_key in state.errors)) {
                                 var value = lodash_default.a.get(state.values, _key),
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
                                       this.setError(state, path, err.message);
                                    }
                                 } catch (err) {
                                    _iterator.e(err);
                                 } finally {
                                    _iterator.f();
                                 }
                              }
                           var errorsPairs = objectDeepPairs(state.errors),
                              nextIsValid = !Boolean(
                                 errorsPairs.find(function(el) {
                                    return Boolean(el[1]);
                                 }),
                              );
                           if (allTouched) {
                              var _step2,
                                 _iterator2 = Object(createForOfIteratorHelper.a)(errorsPairs);
                              try {
                                 for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
                                    var pair = _step2.value;
                                    this.setTouched(state, pair[0], !0);
                                 }
                              } catch (err) {
                                 _iterator2.e(err);
                              } finally {
                                 _iterator2.f();
                              }
                           }
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
            },
            src_FormManager = (function() {
               function FormManager(props) {
                  Object(classCallCheck.a)(this, FormManager),
                     (this.customValidators = {}),
                     (this.apolloClient = void 0),
                     (this.name = void 0),
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
                     (this.manipulator = void 0),
                     (this.apolloClient = props.apolloClient),
                     (this.name = props.name),
                     (this.validateHandler = props.validate),
                     (this.query = this.getQuery()),
                     (this.onChange = props.onChange),
                     (this.onSubmit = props.onSubmit),
                     (this.validationSchema = props.validationSchema),
                     (this.validateOnMount = props.validateOnMount),
                     (this.resetOnSubmit = props.resetOnSubmit),
                     (this.initialState = lodash_default.a.cloneDeep(props.initialState)),
                     (this.initialErrors = lodash_default.a.cloneDeep(props.initialErrors) || {}),
                     (this.initialTouches = lodash_default.a.cloneDeep(props.initialTouches) || {}),
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
                              lodash_default.a.cloneDeep(data[this.name])
                           );
                        },
                     },
                     {
                        key: 'useState',
                        value: function useState(getValue) {
                           var _this = this,
                              _React$useState = react_default.a.useState(
                                 getValue ? getValue(this.get()) : this.get(),
                              ),
                              _React$useState2 = Object(slicedToArray.a)(_React$useState, 2),
                              state = _React$useState2[0],
                              setState = _React$useState2[1];
                           return (
                              react_default.a.useEffect(
                                 function() {
                                    return _this.apolloClient.cache.watch({
                                       query: _this.getQuery(),
                                       callback: function callback(_ref) {
                                          var s = _ref.result[_this.name],
                                             v = getValue ? getValue(s) : s;
                                          lodash_default.a.isEqual(state, v) || setState(v);
                                       },
                                       optimistic: !1,
                                    });
                                 },
                                 [getValue, state],
                              ),
                              state
                           );
                        },
                     },
                     {
                        key: 'useValue',
                        value: function useValue(key) {
                           var _this2 = this;
                           return this.useState(function(state) {
                              return _this2.manipulator.getValue(state, key);
                           });
                        },
                     },
                     {
                        key: 'useTouched',
                        value: function useTouched(key) {
                           var _this3 = this;
                           return this.useState(function(state) {
                              return _this3.manipulator.getTouched(state, key);
                           });
                        },
                     },
                     {
                        key: 'useError',
                        value: function useError(key) {
                           var _this4 = this;
                           return this.useState(function(state) {
                              return _this4.manipulator.getError(state, key);
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
                              getDeepStatus(state.touches, key) ||
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
                           var errorsPairs = objectDeepPairs(state.errors),
                              nextIsValid = Boolean(
                                 errorsPairs.find(function(el) {
                                    return Boolean(el[1]);
                                 }),
                              );
                           return (state.isValid = nextIsValid), this.set(state);
                        },
                     },
                     {
                        key: 'setFieldTouched',
                        value: function setFieldTouched(key, value) {
                           var state = this.get();
                           return this.manipulator.setTouched(state, key, value), this.set(state);
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
                           var _this5 = this,
                              state = this.get();
                           this.manipulator.validate(state, !0),
                              (state.isSubmitted = !0),
                              this.onSubmit && state.isValid
                                 ? ((state.loading = !0),
                                   this.set(state),
                                   this.onSubmit(state, this)
                                      .then(function() {
                                         (state.loading = !1),
                                            _this5.resetOnSubmit && _this5.manipulator.reset(state),
                                            _this5.set(state);
                                      })
                                      .catch(function() {
                                         (state.loading = !1), _this5.set(state);
                                      }))
                                 : this.set(state);
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
                           return query(this.name);
                        },
                     },
                  ]),
                  FormManager
               );
            })();
         var hooks_useApolloForm = function useApolloForm(_ref) {
            var resetOnUnmount = _ref.resetOnUnmount,
               enableReinitialize = _ref.enableReinitialize,
               initialState = _ref.initialState,
               props = Object(objectWithoutProperties.a)(_ref, [
                  'resetOnUnmount',
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
                     return (
                        enableReinitialize && mountedRef.current && manager.reset(initialState),
                        (mountedRef.current = !0),
                        function() {
                           resetOnUnmount && manager.reset();
                        }
                     );
                  },
                  [resetOnUnmount, enableReinitialize],
               ),
               manager
            );
         };
         __webpack_require__(171), __webpack_require__(215);
         var Submit = __webpack_require__(216),
            FormContext = __webpack_require__(131);
         var src_ApolloForm = function ApolloForm(_ref) {
            var children = _ref.children,
               className = _ref.className,
               style = _ref.style,
               params = Object(objectWithoutProperties.a)(_ref, ['children', 'className', 'style']),
               manager = hooks_useApolloForm(params);
            return react_default.a.createElement(
               FormContext.a.Provider,
               { value: manager },
               react_default.a.createElement(
                  'form',
                  {
                     onSubmit: function onSubmit(e) {
                        e.preventDefault(), e.stopPropagation(), manager.submit();
                     },
                     style: style,
                     className: className,
                  },
                  children,
               ),
            );
         };
         __webpack_require__(130);
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
               return query;
            });
      },
      798: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            function(module) {
               var _storybook_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(139);
               (module._StorybookPreserveDecorators = !0),
                  Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)(
                     [__webpack_require__(799)],
                     module,
                  );
            }.call(this, __webpack_require__(168)(module));
      },
      799: function(module, exports, __webpack_require__) {
         var map = {
            './example.stories.tsx': 800,
            './signin.stories.tsx': 812,
            './todo-list.stories.tsx': 1008,
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
            (webpackContext.id = 799);
      },
      800: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            __webpack_require__.d(__webpack_exports__, 'Example', function() {
               return Example;
            });
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               94,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               35,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
               134,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
               93,
            ),
            react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0),
            _src__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(62),
            yup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(50),
            _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(437),
            _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(12),
            _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1017),
            _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(77),
            _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(292),
            _src_utils_ErrorMessage__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(171),
            _src_utils_Submit__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(216),
            _src_consumers_FormConsumer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(170),
            _src_consumers_StateConsumer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(136),
            _src_field_FieldArray__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(214),
            _src_utils_FormLoader__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(215),
            addSourceDecorator =
               (__webpack_require__(129).withSource, __webpack_require__(129).addSource);
         __webpack_exports__.default = {
            parameters: {
               storySource: {
                  source:
                     "import * as React from 'react';\nimport { ApolloForm, ApolloFormState, Field, FieldValidator } from '../src';\nimport * as Yup from 'yup';\nimport TextField from '@material-ui/core/TextField';\nimport Grid from '@material-ui/core/Grid';\nimport Box from '@material-ui/core/Box';\nimport Button from '@material-ui/core/Button';\nimport Divider from '@material-ui/core/Divider';\nimport ErrorMessage from '../src/utils/ErrorMessage';\nimport Submit from '../src/utils/Submit';\nimport FormConsumer from '../src/consumers/FormConsumer';\nimport StateConsumer from '../src/consumers/StateConsumer';\nimport FieldArray from '../src/field/FieldArray';\nimport FormLoader from '../src/utils/FormLoader';\n\nexport default {\n   title: 'Components',\n};\n\nconst validationSchema = Yup.object().shape({\n   email: Yup.string()\n      .required()\n      .max(5),\n   password: Yup.string()\n      .required()\n      .max(3),\n   deep: Yup.object().shape({\n      one: Yup.string()\n         .required()\n         .max(2),\n   }),\n   arr: Yup.array()\n      .of(\n         Yup.string()\n            .required()\n            .max(3),\n      )\n      .min(3)\n      .test('aeqwes', 'error test', arr => {\n         return !(arr.filter((el: string) => el.length === 2).length > 0);\n      }),\n});\n\nfunction FormTextField(props: { name: string; validate?: FieldValidator<string>; label: string }) {\n   return (\n      <Field<string> name={props.name} validate={props.validate}>\n         {({ field }) => {\n            const err = Boolean(field.touched && field.error);\n            console.log('render ' + props.name);\n\n            return (\n               <TextField\n                  value={field.value}\n                  onChange={e => field.setFieldValue(e.target.value)}\n                  onBlur={() => field.setFieldTouched(true)}\n                  helperText={err ? field.error : undefined}\n                  error={Boolean(field.touched && field.error)}\n                  label={props.label}\n               />\n            );\n         }}\n      </Field>\n   );\n}\n\nfunction FormTextFieldArray(props: { name: string; validate: FieldValidator<string[]> }) {\n   return (\n      <FieldArray<string> name={props.name} validate={props.validate}>\n         {({ field }) => {\n            return (\n               <>\n                  {field.value.map((el, i) => {\n                     return (\n                        <Grid item xs={3} key={'arr-field' + i}>\n                           <FormTextField\n                              key={'test' + i}\n                              name={props.name + '.' + i}\n                              label={props.name + '.' + i}\n                           />\n                        </Grid>\n                     );\n                  })}\n\n                  <Grid item xs={3}>\n                     <Box display='flex'>\n                        <Button onClick={() => field.push((field.value.length + 1).toString())}>\n                           push\n                        </Button>\n                        <Button onClick={() => field.pop()}>pop</Button>\n                     </Box>\n                  </Grid>\n               </>\n            );\n         }}\n      </FieldArray>\n   );\n}\n\nexport function Example() {\n   const [initialState, setState] = React.useState({\n      email: '1',\n      password: '',\n      deep: { one: '1' },\n      arr: ['', '2', '31'],\n   });\n\n   // check enableReinitialize\n   // React.useEffect(() => {\n   //    const interval = setInterval(() => {\n   //       setState({ ...initialState, email: initialState.email + '1' });\n   //    }, 2000);\n   //\n   //    return () => clearInterval(interval);\n   // }, [setState, initialState]);\n   // console.log('render');\n\n   return (\n      <ApolloForm\n         name='test'\n         initialState={initialState}\n         validationSchema={validationSchema}\n         validate={({ values }) => {\n            if (values.email === '12') {\n               return {\n                  email: 'Not 12',\n               };\n            }\n\n            return undefined;\n         }}\n         onSubmit={async ({ values }, form) => {\n            await wait(1000);\n            console.log('submit', values);\n            form.reset({\n               ...values,\n               email: 'Reseted',\n            });\n         }}\n         onChange={(state, form) => console.log('onChange: ', form.get().values)}\n         enableReinitialize\n      >\n         <Grid container spacing={2}>\n            <Grid container item xs={12} spacing={2}>\n               <Grid item xs={3}>\n                  <FormTextField\n                     name='email'\n                     label='email'\n                     validate={v => {\n                        if (v.length === 1) {\n                           return 'custom error';\n                        }\n                     }}\n                  />\n               </Grid>\n               <Grid item xs={3}>\n                  <FormTextField name='password' label='password' />\n               </Grid>\n               <Grid item xs={3}>\n                  <FormTextField name='deep.one' label='Deep one' />\n               </Grid>\n            </Grid>\n            <Grid container item xs={12} spacing={2}>\n               <FormTextFieldArray\n                  name='arr'\n                  validate={arr => {\n                     if (arr.filter(el => el.length === 0).length !== 0) {\n                        return 'not empty in arr';\n                     }\n                  }}\n               />\n            </Grid>\n\n            <Grid item xs={12}>\n               <Divider />\n            </Grid>\n            <Grid item xs={12}>\n               <FormConsumer>\n                  {({ form }) => <Button onClick={() => form.reset()}>RESET</Button>}\n               </FormConsumer>\n               <FormConsumer>\n                  {({ form }) => <Button onClick={() => form.validate(true)}>VALIDATE</Button>}\n               </FormConsumer>\n               <Submit>\n                  {({ isValid, isSubmitted, loading }) => (\n                     <Button type='submit' disabled={loading || (isSubmitted ? !isValid : false)}>\n                        Submit\n                     </Button>\n                  )}\n               </Submit>\n            </Grid>\n\n            <Grid item xs={12}>\n               <Divider />\n            </Grid>\n            <Grid item xs={12} container spacing={2}>\n               <Grid item xs={2}>\n                  <StateConsumer<ApolloFormState<any>>>\n                     {({ state: { isValid } }) => <>{'Is valid: ' + isValid.toString()}</>}\n                  </StateConsumer>\n               </Grid>\n               <Grid item xs={2}>\n                  <FormLoader>{({ loading }) => <>{'Loading ' + loading.toString()}</>}</FormLoader>\n               </Grid>\n               <Grid item xs={2}>\n                  <StateConsumer<boolean> selector={s => s.existsChanges}>\n                     {({ state: existsChanges }) => (\n                        <>{'Exists changes: ' + existsChanges.toString()}</>\n                     )}\n                  </StateConsumer>\n               </Grid>\n               <Grid item xs={2}>\n                  <StateConsumer<boolean> selector={s => s.isSubmitted}>\n                     {({ state: isSubmitted }) => <>{'Is submitted: ' + isSubmitted.toString()}</>}\n                  </StateConsumer>\n               </Grid>\n            </Grid>\n            <Grid item xs={12}>\n               <Divider />\n            </Grid>\n\n            <Grid item xs={3}>\n               <ErrorMessage\n                  name='password'\n                  children={({ error }) => (\n                     <span>\n                        password-err: (<b style={{ color: 'red' }}>{error}</b>)\n                     </span>\n                  )}\n               />\n            </Grid>\n            <Grid item xs={3}>\n               <ErrorMessage\n                  name='arr'\n                  children={({ error }) => (\n                     <span>\n                        arr-err: (<b style={{ color: 'red' }}>{error}</b>)\n                     </span>\n                  )}\n               />\n            </Grid>\n         </Grid>\n      </ApolloForm>\n   );\n}\n\nfunction wait(time: number) {\n   return new Promise(resolve => setTimeout(resolve, time));\n}\n",
                  locationsMap: {
                     'components--example': {
                        startLoc: { col: 7, line: 99 },
                        endLoc: { col: 1, line: 244 },
                        startBody: { col: 7, line: 99 },
                        endBody: { col: 1, line: 244 },
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
               .test('aeqwes', 'error test', function(arr) {
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
                  return (
                     console.log('render ' + props.name),
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
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
                     )
                  );
               },
            );
         }
         function FormTextFieldArray(props) {
            return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
               _src_field_FieldArray__WEBPACK_IMPORTED_MODULE_16__.a,
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
                        { item: !0, xs: 3 },
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__.a,
                           { display: 'flex' },
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__.a,
                              {
                                 onClick: function onClick() {
                                    return field.push((field.value.length + 1).toString());
                                 },
                              },
                              'push',
                           ),
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__.a,
                              {
                                 onClick: function onClick() {
                                    return field.pop();
                                 },
                              },
                              'pop',
                           ),
                        ),
                     ),
                  );
               },
            );
         }
         var Example = addSourceDecorator(
            function Example() {
               var _React$useState = react__WEBPACK_IMPORTED_MODULE_4__.useState({
                     email: '1',
                     password: '',
                     deep: { one: '1' },
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
                     name: 'test',
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
                        return console.log('onChange: ', form.get().values);
                     },
                     enableReinitialize: !0,
                  },
                  react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                     _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                     { container: !0, spacing: 2 },
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                        { container: !0, item: !0, xs: 12, spacing: 2 },
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                           { item: !0, xs: 3 },
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(FormTextField, {
                              name: 'email',
                              label: 'email',
                              validate: function validate(v) {
                                 if (1 === v.length) return 'custom error';
                              },
                           }),
                        ),
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                           { item: !0, xs: 3 },
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(FormTextField, {
                              name: 'password',
                              label: 'password',
                           }),
                        ),
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                           { item: !0, xs: 3 },
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(FormTextField, {
                              name: 'deep.one',
                              label: 'Deep one',
                           }),
                        ),
                     ),
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                        { container: !0, item: !0, xs: 12, spacing: 2 },
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
                           _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_11__.a,
                           null,
                        ),
                     ),
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                        { item: !0, xs: 12 },
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _src_consumers_FormConsumer__WEBPACK_IMPORTED_MODULE_14__.a,
                           null,
                           function(_ref6) {
                              var form = _ref6.form;
                              return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                 _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__.a,
                                 {
                                    onClick: function onClick() {
                                       return form.reset();
                                    },
                                 },
                                 'RESET',
                              );
                           },
                        ),
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _src_consumers_FormConsumer__WEBPACK_IMPORTED_MODULE_14__.a,
                           null,
                           function(_ref7) {
                              var form = _ref7.form;
                              return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                 _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__.a,
                                 {
                                    onClick: function onClick() {
                                       return form.validate(!0);
                                    },
                                 },
                                 'VALIDATE',
                              );
                           },
                        ),
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _src_utils_Submit__WEBPACK_IMPORTED_MODULE_13__.a,
                           null,
                           function(_ref8) {
                              var isValid = _ref8.isValid,
                                 isSubmitted = _ref8.isSubmitted,
                                 loading = _ref8.loading;
                              return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                 _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__.a,
                                 {
                                    type: 'submit',
                                    disabled: loading || (!!isSubmitted && !isValid),
                                 },
                                 'Submit',
                              );
                           },
                        ),
                     ),
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                        { item: !0, xs: 12 },
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_11__.a,
                           null,
                        ),
                     ),
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                        { item: !0, xs: 12, container: !0, spacing: 2 },
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                           { item: !0, xs: 2 },
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              _src_consumers_StateConsumer__WEBPACK_IMPORTED_MODULE_15__.a,
                              null,
                              function(_ref9) {
                                 var isValid = _ref9.state.isValid;
                                 return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                    react__WEBPACK_IMPORTED_MODULE_4__.Fragment,
                                    null,
                                    'Is valid: ' + isValid.toString(),
                                 );
                              },
                           ),
                        ),
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                           { item: !0, xs: 2 },
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              _src_utils_FormLoader__WEBPACK_IMPORTED_MODULE_17__.a,
                              null,
                              function(_ref10) {
                                 var loading = _ref10.loading;
                                 return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                    react__WEBPACK_IMPORTED_MODULE_4__.Fragment,
                                    null,
                                    'Loading ' + loading.toString(),
                                 );
                              },
                           ),
                        ),
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                           { item: !0, xs: 2 },
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              _src_consumers_StateConsumer__WEBPACK_IMPORTED_MODULE_15__.a,
                              {
                                 selector: function selector(s) {
                                    return s.existsChanges;
                                 },
                              },
                              function(_ref11) {
                                 var existsChanges = _ref11.state;
                                 return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                    react__WEBPACK_IMPORTED_MODULE_4__.Fragment,
                                    null,
                                    'Exists changes: ' + existsChanges.toString(),
                                 );
                              },
                           ),
                        ),
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                           { item: !0, xs: 2 },
                           react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                              _src_consumers_StateConsumer__WEBPACK_IMPORTED_MODULE_15__.a,
                              {
                                 selector: function selector(s) {
                                    return s.isSubmitted;
                                 },
                              },
                              function(_ref12) {
                                 var isSubmitted = _ref12.state;
                                 return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                    react__WEBPACK_IMPORTED_MODULE_4__.Fragment,
                                    null,
                                    'Is submitted: ' + isSubmitted.toString(),
                                 );
                              },
                           ),
                        ),
                     ),
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                        { item: !0, xs: 12 },
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_11__.a,
                           null,
                        ),
                     ),
                     react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                        _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__.a,
                        { item: !0, xs: 3 },
                        react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                           _src_utils_ErrorMessage__WEBPACK_IMPORTED_MODULE_12__.a,
                           {
                              name: 'password',
                              children: function children(_ref13) {
                                 var error = _ref13.error;
                                 return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                    'span',
                                    null,
                                    'password-err: (',
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
                           _src_utils_ErrorMessage__WEBPACK_IMPORTED_MODULE_12__.a,
                           {
                              name: 'arr',
                              children: function children(_ref14) {
                                 var error = _ref14.error;
                                 return react__WEBPACK_IMPORTED_MODULE_4__.createElement(
                                    'span',
                                    null,
                                    'arr-err: (',
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
               );
            },
            {
               __STORY__:
                  "import * as React from 'react';\nimport { ApolloForm, ApolloFormState, Field, FieldValidator } from '../src';\nimport * as Yup from 'yup';\nimport TextField from '@material-ui/core/TextField';\nimport Grid from '@material-ui/core/Grid';\nimport Box from '@material-ui/core/Box';\nimport Button from '@material-ui/core/Button';\nimport Divider from '@material-ui/core/Divider';\nimport ErrorMessage from '../src/utils/ErrorMessage';\nimport Submit from '../src/utils/Submit';\nimport FormConsumer from '../src/consumers/FormConsumer';\nimport StateConsumer from '../src/consumers/StateConsumer';\nimport FieldArray from '../src/field/FieldArray';\nimport FormLoader from '../src/utils/FormLoader';\n\nexport default {\n   title: 'Components',\n};\n\nconst validationSchema = Yup.object().shape({\n   email: Yup.string()\n      .required()\n      .max(5),\n   password: Yup.string()\n      .required()\n      .max(3),\n   deep: Yup.object().shape({\n      one: Yup.string()\n         .required()\n         .max(2),\n   }),\n   arr: Yup.array()\n      .of(\n         Yup.string()\n            .required()\n            .max(3),\n      )\n      .min(3)\n      .test('aeqwes', 'error test', arr => {\n         return !(arr.filter((el: string) => el.length === 2).length > 0);\n      }),\n});\n\nfunction FormTextField(props: { name: string; validate?: FieldValidator<string>; label: string }) {\n   return (\n      <Field<string> name={props.name} validate={props.validate}>\n         {({ field }) => {\n            const err = Boolean(field.touched && field.error);\n            console.log('render ' + props.name);\n\n            return (\n               <TextField\n                  value={field.value}\n                  onChange={e => field.setFieldValue(e.target.value)}\n                  onBlur={() => field.setFieldTouched(true)}\n                  helperText={err ? field.error : undefined}\n                  error={Boolean(field.touched && field.error)}\n                  label={props.label}\n               />\n            );\n         }}\n      </Field>\n   );\n}\n\nfunction FormTextFieldArray(props: { name: string; validate: FieldValidator<string[]> }) {\n   return (\n      <FieldArray<string> name={props.name} validate={props.validate}>\n         {({ field }) => {\n            return (\n               <>\n                  {field.value.map((el, i) => {\n                     return (\n                        <Grid item xs={3} key={'arr-field' + i}>\n                           <FormTextField\n                              key={'test' + i}\n                              name={props.name + '.' + i}\n                              label={props.name + '.' + i}\n                           />\n                        </Grid>\n                     );\n                  })}\n\n                  <Grid item xs={3}>\n                     <Box display='flex'>\n                        <Button onClick={() => field.push((field.value.length + 1).toString())}>\n                           push\n                        </Button>\n                        <Button onClick={() => field.pop()}>pop</Button>\n                     </Box>\n                  </Grid>\n               </>\n            );\n         }}\n      </FieldArray>\n   );\n}\n\nexport function Example() {\n   const [initialState, setState] = React.useState({\n      email: '1',\n      password: '',\n      deep: { one: '1' },\n      arr: ['', '2', '31'],\n   });\n\n   // check enableReinitialize\n   // React.useEffect(() => {\n   //    const interval = setInterval(() => {\n   //       setState({ ...initialState, email: initialState.email + '1' });\n   //    }, 2000);\n   //\n   //    return () => clearInterval(interval);\n   // }, [setState, initialState]);\n   // console.log('render');\n\n   return (\n      <ApolloForm\n         name='test'\n         initialState={initialState}\n         validationSchema={validationSchema}\n         validate={({ values }) => {\n            if (values.email === '12') {\n               return {\n                  email: 'Not 12',\n               };\n            }\n\n            return undefined;\n         }}\n         onSubmit={async ({ values }, form) => {\n            await wait(1000);\n            console.log('submit', values);\n            form.reset({\n               ...values,\n               email: 'Reseted',\n            });\n         }}\n         onChange={(state, form) => console.log('onChange: ', form.get().values)}\n         enableReinitialize\n      >\n         <Grid container spacing={2}>\n            <Grid container item xs={12} spacing={2}>\n               <Grid item xs={3}>\n                  <FormTextField\n                     name='email'\n                     label='email'\n                     validate={v => {\n                        if (v.length === 1) {\n                           return 'custom error';\n                        }\n                     }}\n                  />\n               </Grid>\n               <Grid item xs={3}>\n                  <FormTextField name='password' label='password' />\n               </Grid>\n               <Grid item xs={3}>\n                  <FormTextField name='deep.one' label='Deep one' />\n               </Grid>\n            </Grid>\n            <Grid container item xs={12} spacing={2}>\n               <FormTextFieldArray\n                  name='arr'\n                  validate={arr => {\n                     if (arr.filter(el => el.length === 0).length !== 0) {\n                        return 'not empty in arr';\n                     }\n                  }}\n               />\n            </Grid>\n\n            <Grid item xs={12}>\n               <Divider />\n            </Grid>\n            <Grid item xs={12}>\n               <FormConsumer>\n                  {({ form }) => <Button onClick={() => form.reset()}>RESET</Button>}\n               </FormConsumer>\n               <FormConsumer>\n                  {({ form }) => <Button onClick={() => form.validate(true)}>VALIDATE</Button>}\n               </FormConsumer>\n               <Submit>\n                  {({ isValid, isSubmitted, loading }) => (\n                     <Button type='submit' disabled={loading || (isSubmitted ? !isValid : false)}>\n                        Submit\n                     </Button>\n                  )}\n               </Submit>\n            </Grid>\n\n            <Grid item xs={12}>\n               <Divider />\n            </Grid>\n            <Grid item xs={12} container spacing={2}>\n               <Grid item xs={2}>\n                  <StateConsumer<ApolloFormState<any>>>\n                     {({ state: { isValid } }) => <>{'Is valid: ' + isValid.toString()}</>}\n                  </StateConsumer>\n               </Grid>\n               <Grid item xs={2}>\n                  <FormLoader>{({ loading }) => <>{'Loading ' + loading.toString()}</>}</FormLoader>\n               </Grid>\n               <Grid item xs={2}>\n                  <StateConsumer<boolean> selector={s => s.existsChanges}>\n                     {({ state: existsChanges }) => (\n                        <>{'Exists changes: ' + existsChanges.toString()}</>\n                     )}\n                  </StateConsumer>\n               </Grid>\n               <Grid item xs={2}>\n                  <StateConsumer<boolean> selector={s => s.isSubmitted}>\n                     {({ state: isSubmitted }) => <>{'Is submitted: ' + isSubmitted.toString()}</>}\n                  </StateConsumer>\n               </Grid>\n            </Grid>\n            <Grid item xs={12}>\n               <Divider />\n            </Grid>\n\n            <Grid item xs={3}>\n               <ErrorMessage\n                  name='password'\n                  children={({ error }) => (\n                     <span>\n                        password-err: (<b style={{ color: 'red' }}>{error}</b>)\n                     </span>\n                  )}\n               />\n            </Grid>\n            <Grid item xs={3}>\n               <ErrorMessage\n                  name='arr'\n                  children={({ error }) => (\n                     <span>\n                        arr-err: (<b style={{ color: 'red' }}>{error}</b>)\n                     </span>\n                  )}\n               />\n            </Grid>\n         </Grid>\n      </ApolloForm>\n   );\n}\n\nfunction wait(time: number) {\n   return new Promise(resolve => setTimeout(resolve, time));\n}\n",
               __ADDS_MAP__: {
                  'components--example': {
                     startLoc: { col: 7, line: 99 },
                     endLoc: { col: 1, line: 244 },
                     startBody: { col: 7, line: 99 },
                     endBody: { col: 1, line: 244 },
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
      812: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            __webpack_require__.d(__webpack_exports__, 'SignIn', function() {
               return SignIn;
            });
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               94,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               134,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
               35,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
               93,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
               70,
            ),
            yup__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(50),
            _src__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(62),
            _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(437),
            react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(0),
            _material_ui_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(12),
            _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(293),
            _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(233),
            _material_ui_core_InputAdornment__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
               1013,
            ),
            _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(1014),
            _material_ui_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(1015),
            _material_ui_icons__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1016),
            _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(77),
            _material_ui_core_CircularProgress__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
               436,
            ),
            _utils__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(229),
            _apollo_client__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(76),
            addSourceDecorator =
               (__webpack_require__(129).withSource, __webpack_require__(129).addSource);
         __webpack_exports__.default = {
            parameters: {
               storySource: {
                  source:
                     "import * as Yup from 'yup';\nimport { ApolloForm, Field, makeApolloFormQuery, Submit } from '../src';\nimport TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';\nimport * as React from 'react';\nimport { IUseFieldProps } from '../src/hooks/useField';\nimport { ButtonProps, Grid } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport Paper from '@material-ui/core/Paper';\nimport InputAdornment from '@material-ui/core/InputAdornment';\nimport IconButton from '@material-ui/core/IconButton';\nimport { Visibility, VisibilityOff } from '@material-ui/icons';\nimport Button from '@material-ui/core/Button';\nimport CircularProgress from '@material-ui/core/CircularProgress';\nimport { CodeHighlighter } from './utils';\nimport { useQuery } from '@apollo/client';\n\nexport default {\n   title: 'Components',\n};\n\ntype SignInFormState = {\n   email: string;\n   password: string;\n};\n\nconst validationSchema = Yup.object().shape<SignInFormState>({\n   email: Yup.string()\n      .required()\n      .min(4),\n   password: Yup.string()\n      .required()\n      .min(4),\n});\n\nconst initialState: SignInFormState = {\n   email: '',\n   password: '',\n};\n\ntype FormTextFieldProps = Omit<OutlinedTextFieldProps, 'variant'> & IUseFieldProps<string>;\n\nfunction FormTextField({ name, validate, ...other }: FormTextFieldProps) {\n   return (\n      <Field<string> name={name} validate={validate}>\n         {({ field }) => {\n            const err = Boolean(field.touched && field.error);\n\n            return (\n               <TextField\n                  value={field.value}\n                  onChange={e => field.setFieldValue(e.target.value)}\n                  onBlur={() => field.setFieldTouched(true)}\n                  helperText={err ? field.error : undefined}\n                  error={Boolean(field.touched && field.error)}\n                  variant='outlined'\n                  {...other}\n               />\n            );\n         }}\n      </Field>\n   );\n}\n\nfunction FormPassword(props: FormTextFieldProps) {\n   const [show, toggle] = React.useState(false);\n\n   return (\n      <FormTextField\n         {...props}\n         type={show ? 'text' : 'password'}\n         InputProps={{\n            endAdornment: (\n               <InputAdornment position='end'>\n                  <IconButton onClick={() => toggle(!show)}>\n                     {show ? <Visibility /> : <VisibilityOff />}\n                  </IconButton>\n               </InputAdornment>\n            ),\n            ...props.InputProps,\n         }}\n      />\n   );\n}\n\nfunction SubmitButton(props: ButtonProps) {\n   return (\n      <Submit>\n         {({ isValid, isSubmitted, loading }) =>\n            loading ? (\n               <CircularProgress />\n            ) : (\n               <Button disabled={isSubmitted ? !isValid : false} {...props} />\n            )\n         }\n      </Submit>\n   );\n}\n\nexport function SignIn() {\n   return (\n      <Grid container spacing={3}>\n         <Grid item xs={12} md={6}>\n            <Paper style={{ maxWidth: 500, padding: 20 }}>\n               <ApolloForm<SignInFormState>\n                  name='signin'\n                  initialState={initialState}\n                  validationSchema={validationSchema}\n                  onSubmit={async ({ values }, form) => {\n                     await wait(1000);\n                     console.log('Submit state: ', values);\n\n                     form.reset({\n                        ...values,\n                        email: 'reseted-email',\n                     });\n                  }}\n               >\n                  <Grid container spacing={2}>\n                     <Grid item xs={12}>\n                        <Typography variant='h5' align='center'>\n                           Sign in form\n                        </Typography>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FormTextField\n                           name='email'\n                           type='email'\n                           label='Enter email'\n                           validate={email => {\n                              if (email && email.includes('@mail.ru')) {\n                                 return 'Please don`t use @mail.ru email';\n                              }\n                           }}\n                           fullWidth\n                        />\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FormPassword name='password' label='Enter password' fullWidth />\n                     </Grid>\n                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>\n                        <SubmitButton type='submit' variant='contained' color='primary'>\n                           Sign in\n                        </SubmitButton>\n                     </Grid>\n                  </Grid>\n               </ApolloForm>\n            </Paper>\n         </Grid>\n         <Grid item xs={12} md={6}>\n            <PreviewState />\n         </Grid>\n      </Grid>\n   );\n}\n\nfunction PreviewState() {\n   const [query] = React.useState(makeApolloFormQuery('signin'));\n\n   const { data } = useQuery(query);\n\n   return (\n      <Paper style={{ maxWidth: 500, padding: 20 }}>\n         {data && <CodeHighlighter>{JSON.stringify(data, null, 2)}</CodeHighlighter>}\n      </Paper>\n   );\n}\n\nfunction wait(time: number) {\n   return new Promise(resolve => setTimeout(resolve, time));\n}\n",
                  locationsMap: {
                     'components--sign-in': {
                        startLoc: { col: 7, line: 99 },
                        endLoc: { col: 1, line: 154 },
                        startBody: { col: 7, line: 99 },
                        endBody: { col: 1, line: 154 },
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
                     err = Boolean(field.touched && field.error);
                  return react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                     _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__.a,
                     Object.assign(
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
                           variant: 'outlined',
                        },
                        other,
                     ),
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
                                                            wait(1e3)
                                                         );
                                                      case 3:
                                                         console.log('Submit state: ', values),
                                                            form.reset(
                                                               Object(
                                                                  _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_2__.a,
                                                               )({}, values, {
                                                                  email: 'reseted-email',
                                                               }),
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
                     react__WEBPACK_IMPORTED_MODULE_8__.createElement(PreviewState, null),
                  ),
               );
            },
            {
               __STORY__:
                  "import * as Yup from 'yup';\nimport { ApolloForm, Field, makeApolloFormQuery, Submit } from '../src';\nimport TextField, { OutlinedTextFieldProps } from '@material-ui/core/TextField';\nimport * as React from 'react';\nimport { IUseFieldProps } from '../src/hooks/useField';\nimport { ButtonProps, Grid } from '@material-ui/core';\nimport Typography from '@material-ui/core/Typography';\nimport Paper from '@material-ui/core/Paper';\nimport InputAdornment from '@material-ui/core/InputAdornment';\nimport IconButton from '@material-ui/core/IconButton';\nimport { Visibility, VisibilityOff } from '@material-ui/icons';\nimport Button from '@material-ui/core/Button';\nimport CircularProgress from '@material-ui/core/CircularProgress';\nimport { CodeHighlighter } from './utils';\nimport { useQuery } from '@apollo/client';\n\nexport default {\n   title: 'Components',\n};\n\ntype SignInFormState = {\n   email: string;\n   password: string;\n};\n\nconst validationSchema = Yup.object().shape<SignInFormState>({\n   email: Yup.string()\n      .required()\n      .min(4),\n   password: Yup.string()\n      .required()\n      .min(4),\n});\n\nconst initialState: SignInFormState = {\n   email: '',\n   password: '',\n};\n\ntype FormTextFieldProps = Omit<OutlinedTextFieldProps, 'variant'> & IUseFieldProps<string>;\n\nfunction FormTextField({ name, validate, ...other }: FormTextFieldProps) {\n   return (\n      <Field<string> name={name} validate={validate}>\n         {({ field }) => {\n            const err = Boolean(field.touched && field.error);\n\n            return (\n               <TextField\n                  value={field.value}\n                  onChange={e => field.setFieldValue(e.target.value)}\n                  onBlur={() => field.setFieldTouched(true)}\n                  helperText={err ? field.error : undefined}\n                  error={Boolean(field.touched && field.error)}\n                  variant='outlined'\n                  {...other}\n               />\n            );\n         }}\n      </Field>\n   );\n}\n\nfunction FormPassword(props: FormTextFieldProps) {\n   const [show, toggle] = React.useState(false);\n\n   return (\n      <FormTextField\n         {...props}\n         type={show ? 'text' : 'password'}\n         InputProps={{\n            endAdornment: (\n               <InputAdornment position='end'>\n                  <IconButton onClick={() => toggle(!show)}>\n                     {show ? <Visibility /> : <VisibilityOff />}\n                  </IconButton>\n               </InputAdornment>\n            ),\n            ...props.InputProps,\n         }}\n      />\n   );\n}\n\nfunction SubmitButton(props: ButtonProps) {\n   return (\n      <Submit>\n         {({ isValid, isSubmitted, loading }) =>\n            loading ? (\n               <CircularProgress />\n            ) : (\n               <Button disabled={isSubmitted ? !isValid : false} {...props} />\n            )\n         }\n      </Submit>\n   );\n}\n\nexport function SignIn() {\n   return (\n      <Grid container spacing={3}>\n         <Grid item xs={12} md={6}>\n            <Paper style={{ maxWidth: 500, padding: 20 }}>\n               <ApolloForm<SignInFormState>\n                  name='signin'\n                  initialState={initialState}\n                  validationSchema={validationSchema}\n                  onSubmit={async ({ values }, form) => {\n                     await wait(1000);\n                     console.log('Submit state: ', values);\n\n                     form.reset({\n                        ...values,\n                        email: 'reseted-email',\n                     });\n                  }}\n               >\n                  <Grid container spacing={2}>\n                     <Grid item xs={12}>\n                        <Typography variant='h5' align='center'>\n                           Sign in form\n                        </Typography>\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FormTextField\n                           name='email'\n                           type='email'\n                           label='Enter email'\n                           validate={email => {\n                              if (email && email.includes('@mail.ru')) {\n                                 return 'Please don`t use @mail.ru email';\n                              }\n                           }}\n                           fullWidth\n                        />\n                     </Grid>\n                     <Grid item xs={12}>\n                        <FormPassword name='password' label='Enter password' fullWidth />\n                     </Grid>\n                     <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>\n                        <SubmitButton type='submit' variant='contained' color='primary'>\n                           Sign in\n                        </SubmitButton>\n                     </Grid>\n                  </Grid>\n               </ApolloForm>\n            </Paper>\n         </Grid>\n         <Grid item xs={12} md={6}>\n            <PreviewState />\n         </Grid>\n      </Grid>\n   );\n}\n\nfunction PreviewState() {\n   const [query] = React.useState(makeApolloFormQuery('signin'));\n\n   const { data } = useQuery(query);\n\n   return (\n      <Paper style={{ maxWidth: 500, padding: 20 }}>\n         {data && <CodeHighlighter>{JSON.stringify(data, null, 2)}</CodeHighlighter>}\n      </Paper>\n   );\n}\n\nfunction wait(time: number) {\n   return new Promise(resolve => setTimeout(resolve, time));\n}\n",
               __ADDS_MAP__: {
                  'components--sign-in': {
                     startLoc: { col: 7, line: 99 },
                     endLoc: { col: 1, line: 154 },
                     startBody: { col: 7, line: 99 },
                     endBody: { col: 1, line: 154 },
                  },
               },
               __MAIN_FILE_LOCATION__: '/signin.stories.tsx',
               __MODULE_DEPENDENCIES__: [],
               __LOCAL_DEPENDENCIES__: {},
               __SOURCE_PREFIX__: '/Users/maximschiriy/Work/apollo-form/examples',
               __IDS_TO_FRAMEWORKS__: {},
            },
         );
         function PreviewState() {
            var _React$useState3 = react__WEBPACK_IMPORTED_MODULE_8__.useState(
                  Object(_src__WEBPACK_IMPORTED_MODULE_6__.d)('signin'),
               ),
               query = Object(
                  _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__.a,
               )(_React$useState3, 1)[0],
               data = Object(_apollo_client__WEBPACK_IMPORTED_MODULE_19__.useQuery)(query).data;
            return react__WEBPACK_IMPORTED_MODULE_8__.createElement(
               _material_ui_core_Paper__WEBPACK_IMPORTED_MODULE_11__.a,
               { style: { maxWidth: 500, padding: 20 } },
               data &&
                  react__WEBPACK_IMPORTED_MODULE_8__.createElement(
                     _utils__WEBPACK_IMPORTED_MODULE_18__.a,
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
   [[449, 1, 2]],
]);
//# sourceMappingURL=main.a755369aa1214f3cf8d0.bundle.js.map
