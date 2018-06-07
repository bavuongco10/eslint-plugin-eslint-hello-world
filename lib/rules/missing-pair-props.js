/**
 * @fileoverview nothing yet!
 * @author
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "nothing yet!",
      category: "Fill me in",
      recommended: false
    },
    fixable: null,  // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function (context) {
    var isLoadingExist = false;

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      "CallExpression": function (node) {
        var callee = node.callee;
        if (!(callee.name === 'withApp' && callee.type === 'Identifier')) return

        var firstArg = node.arguments[0];

        if (!(firstArg.type === 'ObjectExpression' && firstArg.properties.length > 0)) return

        firstArg.properties.forEach(function (propNode) {
          if (propNode.key.name === 'loading' && propNode.value.value === true && !isLoadingExist) {

            context.report(node, "Missing loading on mapStateToProps");

          }
        })

      },

      "VariableDeclaration": function (node) {
        if (node.declarations[0].id.name === 'mapStateToProps') {
          node.declarations[0].init.body.properties.forEach(function (prop) {
            if (prop.key.name === 'loading') {
              isLoadingExist = true
            }
          })
        }
      },

    };
  }

};