#!/bin/sh

# shellcheck disable=SC2112
function help () {
    echo "jazz - A simple script that makes using the Jasmine testing framework in a standalone project a little simpler."
    echo "    jazz init                  - include jasmine in the project";
    echo "    jazz create FunctionName   - creates ./src/FunctionName.js ./spec/FunctionNameSpec.js";
    echo "    jazz run                   - runs tests in browser";
}

if [ $1 ]
then
    case "$1" in
      init)
       echo 'Ha-ha'
      ;;
      create)

      ;;
      run)

      ;;
      *)
          help
      ;;
  esac
else
   help
fi


