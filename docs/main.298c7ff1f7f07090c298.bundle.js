(window.webpackJsonp = window.webpackJsonp || []).push([
   [0],
   {
      125: function(module, exports) {},
      126: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            FormContext = __webpack_require__
               .n(react__WEBPACK_IMPORTED_MODULE_0__)
               .a.createContext({});
         __webpack_exports__.a = FormContext;
      },
      127: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               32,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               140,
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
      130: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
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
      165: function(module, __webpack_exports__, __webpack_require__) {
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
      166: function(module, __webpack_exports__, __webpack_require__) {
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
                     return _ref.error;
                  };
            return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, {
               error: (props.ignoreTouched ? error : error && touched) && error,
            });
         };
      },
      210: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               77,
            ),
            _hooks_useFieldArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(127),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31);
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
      211: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
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
      212: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _hooks_useApolloFormCtx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
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
      31: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            _FormContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(126);
         __webpack_exports__.a = function useApolloFormCtx() {
            return Object(react__WEBPACK_IMPORTED_MODULE_0__.useContext)(
               _FormContext__WEBPACK_IMPORTED_MODULE_1__.a,
            );
         };
      },
      435: function(module, exports, __webpack_require__) {
         __webpack_require__(436),
            __webpack_require__(582),
            __webpack_require__(583),
            (module.exports = __webpack_require__(786));
      },
      500: function(module, exports) {},
      583: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__);
         var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0),
            react__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               react__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _storybook_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(133),
            _storybook_addon_knobs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(407),
            _apollo_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(87),
            _apollo_client_cache__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(72);
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
      786: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            function(module) {
               var _storybook_react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(133);
               (module._StorybookPreserveDecorators = !0),
                  Object(_storybook_react__WEBPACK_IMPORTED_MODULE_0__.configure)(
                     [__webpack_require__(787)],
                     module,
                  );
            }.call(this, __webpack_require__(163)(module));
      },
      787: function(module, exports, __webpack_require__) {
         var map = { './example.stories.tsx': 788, './signin.stories.tsx': 989 };
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
            (webpackContext.id = 787);
      },
      788: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__),
            __webpack_require__.d(__webpack_exports__, 'Example', function() {
               return Example;
            });
         var _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
               135,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(
               _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
               32,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
               218,
            ),
            _Users_maximschiriy_Work_apollo_form_node_modules_babel_preset_react_app_node_modules_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
               114,
            ),
            react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0),
            _src__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(99),
            yup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(67),
            _material_ui_core_TextField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(993),
            _material_ui_core_Grid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(29),
            _material_ui_core_Box__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(994),
            _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(170),
            _material_ui_core_Divider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(282),
            _src_utils_ErrorMessage__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(166),
            _src_utils_Submit__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(212),
            _src_consumers_FormConsumer__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(165),
            _src_consumers_StateConsumer__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(130),
            _src_field_FieldArray__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(210),
            _src_utils_FormLoader__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(211);
         __webpack_exports__.default = { title: 'Components' };
         var validationSchema = yup__WEBPACK_IMPORTED_MODULE_6__.b().shape({
            email: yup__WEBPACK_IMPORTED_MODULE_6__
               .c()
               .required()
               .max(5),
            password: yup__WEBPACK_IMPORTED_MODULE_6__
               .c()
               .required()
               .max(3),
            deep: yup__WEBPACK_IMPORTED_MODULE_6__.b().shape({
               one: yup__WEBPACK_IMPORTED_MODULE_6__
                  .c()
                  .required()
                  .max(2),
            }),
            arr: yup__WEBPACK_IMPORTED_MODULE_6__
               .a()
               .of(
                  yup__WEBPACK_IMPORTED_MODULE_6__
                     .c()
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
                              { type: 'submit', disabled: loading || (!!isSubmitted && !isValid) },
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
         }
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
               setFieldValue = react__WEBPACK_IMPORTED_MODULE_0___default.a.useCallback(
                  function(v) {
                     apolloForm.setFieldValue(props.name, v, !0);
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
               react__WEBPACK_IMPORTED_MODULE_0___default.a.useEffect(function() {
                  if (props.validate)
                     return (
                        apolloForm.addFieldValidator(props.name, props.validate),
                        function() {
                           return apolloForm.removeFieldValidator(props.name);
                        }
                     );
               }, []),
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
      989: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__.r(__webpack_exports__);
         var regenerator = __webpack_require__(135),
            regenerator_default = __webpack_require__.n(regenerator),
            asyncToGenerator = __webpack_require__(218),
            objectSpread2 = __webpack_require__(32),
            slicedToArray = __webpack_require__(114),
            objectWithoutProperties = __webpack_require__(77),
            es = __webpack_require__(67),
            src = __webpack_require__(99),
            TextField = __webpack_require__(993),
            react = __webpack_require__(0),
            react_default = __webpack_require__.n(react),
            Grid = __webpack_require__(29),
            Typography = __webpack_require__(992),
            Paper = __webpack_require__(1029),
            InputAdornment = __webpack_require__(1030),
            IconButton = __webpack_require__(1031),
            Visibility = __webpack_require__(1032),
            VisibilityOff = __webpack_require__(1033),
            Button = __webpack_require__(170),
            CircularProgress = __webpack_require__(1034),
            default_highlight = __webpack_require__(1036),
            ocean = __webpack_require__(420);
         function CodeHighlighter(props) {
            return react_default.a.createElement(
               default_highlight.a,
               Object.assign({}, props, { language: 'tsx', style: ocean.a }),
            );
         }
         var client = __webpack_require__(87);
         __webpack_require__.d(__webpack_exports__, 'SignIn', function() {
            return SignIn;
         });
         __webpack_exports__.default = { title: 'Components' };
         var validationSchema = es.b().shape({
               email: es
                  .c()
                  .required()
                  .min(4),
               password: es
                  .c()
                  .required()
                  .min(4),
            }),
            initialState = { email: '', password: '' };
         function FormTextField(_ref) {
            var name = _ref.name,
               validate = _ref.validate,
               other = Object(objectWithoutProperties.a)(_ref, ['name', 'validate']);
            return react.createElement(src.b, { name: name, validate: validate }, function(_ref2) {
               var field = _ref2.field,
                  err = Boolean(field.touched && field.error);
               return react.createElement(
                  TextField.a,
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
            });
         }
         function FormPassword(props) {
            var _React$useState = react.useState(!1),
               _React$useState2 = Object(slicedToArray.a)(_React$useState, 2),
               show = _React$useState2[0],
               toggle = _React$useState2[1];
            return react.createElement(
               FormTextField,
               Object.assign({}, props, {
                  type: show ? 'text' : 'password',
                  InputProps: Object(objectSpread2.a)(
                     {
                        endAdornment: react.createElement(
                           InputAdornment.a,
                           { position: 'end' },
                           react.createElement(
                              IconButton.a,
                              {
                                 onClick: function onClick() {
                                    return toggle(!show);
                                 },
                              },
                              show
                                 ? react.createElement(Visibility.a, null)
                                 : react.createElement(VisibilityOff.a, null),
                           ),
                        ),
                     },
                     props.InputProps,
                  ),
               }),
            );
         }
         function SubmitButton(props) {
            return react.createElement(src.c, null, function(_ref3) {
               var isValid = _ref3.isValid,
                  isSubmitted = _ref3.isSubmitted;
               return _ref3.loading
                  ? react.createElement(CircularProgress.a, null)
                  : react.createElement(
                       Button.a,
                       Object.assign({ disabled: !!isSubmitted && !isValid }, props),
                    );
            });
         }
         function SignIn() {
            return react.createElement(
               Grid.a,
               { container: !0, spacing: 3 },
               react.createElement(
                  Grid.a,
                  { item: !0, xs: 12, md: 6 },
                  react.createElement(
                     Paper.a,
                     { style: { maxWidth: 500, padding: 20 } },
                     react.createElement(
                        src.a,
                        {
                           name: 'signin',
                           initialState: initialState,
                           validationSchema: validationSchema,
                           onSubmit: (function() {
                              var _ref5 = Object(asyncToGenerator.a)(
                                 regenerator_default.a.mark(function _callee(_ref4, form) {
                                    var values;
                                    return regenerator_default.a.wrap(function _callee$(_context) {
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
                                                      Object(objectSpread2.a)({}, values, {
                                                         email: 'reseted-email',
                                                      }),
                                                   );
                                             case 5:
                                             case 'end':
                                                return _context.stop();
                                          }
                                    }, _callee);
                                 }),
                              );
                              return function(_x, _x2) {
                                 return _ref5.apply(this, arguments);
                              };
                           })(),
                        },
                        react.createElement(
                           Grid.a,
                           { container: !0, spacing: 2 },
                           react.createElement(
                              Grid.a,
                              { item: !0, xs: 12 },
                              react.createElement(
                                 Typography.a,
                                 { variant: 'h5', align: 'center' },
                                 'Sign in form',
                              ),
                           ),
                           react.createElement(
                              Grid.a,
                              { item: !0, xs: 12 },
                              react.createElement(FormTextField, {
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
                           react.createElement(
                              Grid.a,
                              { item: !0, xs: 12 },
                              react.createElement(FormPassword, {
                                 name: 'password',
                                 label: 'Enter password',
                                 fullWidth: !0,
                              }),
                           ),
                           react.createElement(
                              Grid.a,
                              {
                                 item: !0,
                                 xs: 12,
                                 style: { display: 'flex', justifyContent: 'center' },
                              },
                              react.createElement(
                                 SubmitButton,
                                 { type: 'submit', variant: 'contained', color: 'primary' },
                                 'Sign in',
                              ),
                           ),
                        ),
                     ),
                  ),
               ),
               react.createElement(
                  Grid.a,
                  { item: !0, xs: 12, md: 6 },
                  react.createElement(PreviewState, null),
               ),
            );
         }
         function PreviewState() {
            var _React$useState3 = react.useState(Object(src.d)('signin')),
               query = Object(slicedToArray.a)(_React$useState3, 1)[0],
               data = Object(client.useQuery)(query).data;
            return react.createElement(
               Paper.a,
               { style: { maxWidth: 500, padding: 20 } },
               data && react.createElement(CodeHighlighter, null, JSON.stringify(data, null, 2)),
            );
         }
         function wait(time) {
            return new Promise(function(resolve) {
               return setTimeout(resolve, time);
            });
         }
      },
      99: function(module, __webpack_exports__, __webpack_require__) {
         'use strict';
         __webpack_require__(165), __webpack_require__(130);
         var objectWithoutProperties = __webpack_require__(77),
            useField = __webpack_require__(96),
            useApolloFormCtx = __webpack_require__(31);
         var field_Field = function Field(props) {
               var children = props.children,
                  fieldProps = Object(objectWithoutProperties.a)(props, ['children']),
                  form = Object(useApolloFormCtx.a)();
               return children({ field: Object(useField.a)(fieldProps), form: form });
            },
            react = (__webpack_require__(210), __webpack_require__(0)),
            react_default = __webpack_require__.n(react);
         __webpack_require__(127);
         var objectSpread2 = __webpack_require__(32),
            slicedToArray = __webpack_require__(114),
            defineProperty = __webpack_require__(217),
            createForOfIteratorHelper = __webpack_require__(136),
            classCallCheck = __webpack_require__(280),
            createClass = __webpack_require__(281),
            lodash = __webpack_require__(34),
            lodash_default = __webpack_require__.n(lodash),
            taggedTemplateLiteral = __webpack_require__(410),
            client = __webpack_require__(87);
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
         var FormManager_Changer = (function() {
               function Changer(props) {
                  Object(classCallCheck.a)(this, Changer),
                     (this.validateHandler = void 0),
                     (this.validationSchema = void 0),
                     (this.customValidators = void 0),
                     (this.initialState = void 0),
                     (this.initialErrors = void 0),
                     (this.initialTouches = void 0),
                     (this.validateOnMount = void 0),
                     (this.validateHandler = props.validate),
                     (this.validationSchema = props.validationSchema),
                     (this.customValidators = props.customValidators),
                     (this.initialState = props.initialState),
                     (this.initialErrors = props.initialErrors),
                     (this.initialTouches = props.initialTouches),
                     (this.validateOnMount = props.validateOnMount);
               }
               return (
                  Object(createClass.a)(Changer, [
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
                                    lodash_default.a.set(state.touches, pair[0], !0);
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
                                         Object(objectSpread2.a)({}, defaultState, {
                                            values: getState(state.values),
                                            errors: this.initialErrors,
                                            touches: this.initialTouches,
                                         }),
                                      )
                                    : Object.assign(
                                         state,
                                         Object(objectSpread2.a)({}, defaultState, {
                                            values: state.values,
                                            errors: this.initialErrors,
                                            touches: this.initialTouches,
                                         }),
                                      )
                                 : Object.assign(
                                      state,
                                      Object(objectSpread2.a)({}, defaultState, {
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
                  Changer
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
                     (this.changer = void 0),
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
                     (this.changer = new FormManager_Changer(
                        Object(objectSpread2.a)({}, props, {
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
                           return this.useState(function(state) {
                              return lodash_default.a.get(state.values, key);
                           });
                        },
                     },
                     {
                        key: 'useTouched',
                        value: function useTouched(key) {
                           return this.useState(function(state) {
                              return getDeepStatus(lodash_default.a.cloneDeep(state.touches), key);
                           });
                        },
                     },
                     {
                        key: 'useError',
                        value: function useError(key) {
                           return this.useState(function(state) {
                              return getDeepStatus(lodash_default.a.cloneDeep(state.errors), key);
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
                        value: function setFieldValue(key, newValue, validate) {
                           var state = this.get();
                           return (
                              getDeepStatus(state.touches, key) ||
                                 this.changer.setTouched(state, key, !0),
                              this.changer.setValue(state, key, newValue),
                              this.changer.validate(state, !1),
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
                           this.changer.setError(state, key, error);
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
                           return this.changer.setTouched(state, key, value), this.set(state);
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
                           this.changer.validate(state, allTouched), this.set(state);
                        },
                     },
                     {
                        key: 'validateAt',
                        value: function validateAt(key) {
                           var state = this.get();
                           this.changer.setTouched(state, key, !0),
                              this.changer.validate(state, !1),
                              this.set(state);
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
                           var _this2 = this,
                              state = this.get();
                           this.changer.validate(state, !0),
                              (state.isSubmitted = !0),
                              this.onSubmit && state.isValid
                                 ? ((state.loading = !0),
                                   this.set(state),
                                   this.onSubmit(state, this)
                                      .then(function() {
                                         (state.loading = !1),
                                            _this2.resetOnSubmit && _this2.changer.reset(state),
                                            _this2.set(state);
                                      })
                                      .catch(function() {
                                         (state.loading = !1), _this2.set(state);
                                      }))
                                 : this.set(state);
                        },
                     },
                     {
                        key: 'reset',
                        value: function reset(getState) {
                           var state = this.get();
                           this.changer.reset(state, getState),
                              this.changer.validate(state, this.validateOnMount),
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
         __webpack_require__(166), __webpack_require__(211);
         var Submit = __webpack_require__(212),
            FormContext = __webpack_require__(126);
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
         __webpack_require__(125);
         __webpack_require__.d(__webpack_exports__, 'a', function() {
            return src_ApolloForm;
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
   },
   [[435, 1, 2]],
]);
//# sourceMappingURL=main.298c7ff1f7f07090c298.bundle.js.map
