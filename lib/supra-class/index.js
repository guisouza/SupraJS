/*       .#.
        @@@@@
        @@@@@
          @
    .....@@@
   .@@@@@@@
   @@@@@@@
    @@@@@@@:@@@..@@@@@@@  @@@   @@@ @@@@@@@@   @@@@@@@      @@@@
   .@@@@@@@@    @@@@@@@@  @@@   @@@ @@@@@@@@@  @@@@@@@@@  @@@@@@@@
   '@@@@@@@@@@@@@@@       @@@   @@@ @@@    @@@ @@@   @@@ @@@    @@@
:@@@@@@@@@:     @@@@@@@@  @@@   @@@ @@@@@@@@@  @@@@@@@@@ @@@    @@@
  `@@@@:             @@@  @@@   @@@ @@@#@@@    @@@@@@@@  @@@@@@@@@@
   @@@         @@@@@@@@@  @@@@@@@@' @@@        @@@  @@@  @@@    @@@
   +##`        @@@@@@@@     @@@@@   @@@        @@@  @@@  @@@    @@@

  Supra
  NodeJS
  Developer
  Friendly
  Framework.
*/

(function (root, supraClass) {
    'use strict';

    function forEachProp (obj, callback, thisArg) {
        var name, value;
        for (name in obj) {
            if (obj.hasOwnProperty(name)) {
                value = obj[name];
                callback.call(thisArg || value, value, name, obj);
            }
        }
    }

    function applySuperMethod (fn, sup) {
        return function () {
            var prev, result;
            prev = this.super;
            this.super = sup;
            result = fn.apply(this, arguments);
            this.super = prev;
            if (typeof this.super === 'undefined') {
                delete this.super;
            }
            return result;
        };
    }

    /**
     * Base class
     */
    function Class () {}

    /**
     * Extend method
     * @param  {object} props [Sub-Class Definition]
     * @return {obect}        [Sub-Class]
     */
    Class.extend = function (props) {
        var Parent = this;
        var extendingFlag = '*extending*';
        var proto;

        // Extension
        Parent[extendingFlag] = true;
        proto = new Parent();
        delete Parent[extendingFlag];

        // Add new properties
        forEachProp(props, function (value, name) {
            if ( typeof value === 'function') {
                proto[name] = applySuperMethod(value, Parent.prototype[name]);
                return;
            }
            proto[name] = value;
        });

        // Construct
        function Class () {
            if (!Class[extendingFlag]) {
                proto.init.apply(this, arguments);
            }
        }

        Class.prototype = proto;
        Class.prototype.constructor = Class;

        Class.extend = Parent.extend;
        return Class;

    };
    supraClass.Class = Class;

    module.exports = supraClass;


} (this, {}));
