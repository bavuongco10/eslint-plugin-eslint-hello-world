/**
 * @fileoverview nothing yet!
 * @author
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/missing-pair-props"),

  RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  }
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-full-fp-lib", rule, {

  valid: [
    `
      const mapStateToProps = (state) => ({
        loading: state.hello.world,
        no: 'way'
      });

        const enhance = compose(
          setStatic('navigationOptions', navigationOptions),
          withApp({
            loading: true,
            hello: 'world'
          })
        );
      `
  ],

  invalid: [
    {
      code: `
        const mapStateToProps = (state) => ({
          no: 'way'
        });

        const enhance = compose(
          setStatic('navigationOptions', navigationOptions),
          withApp({
            loading: true,
            hello: 'world'
          })
        );
       `,
      errors: [{
        message: 'Missing loading on mapStateToProps',
        type: 'CallExpression'
      }]
    }
  ]
});