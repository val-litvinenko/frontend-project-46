### Вычислитель отличий.

Это консольное приложение предназначено для вычисления изменений между двумя разными файлами.
Приложение поддерживает только файлы формата JSON и YAML.

Для того, чтобы запустить его, необходимо выполнить команду `npm run gendiff -- <filepath1> <filepath2> --format=<formatname>`
Параметр format можно необязательный, по умолчанию к выводу будет применяться формат stylish.
В приложении доступны следующие форматы вывода: stylish, plain, json.

Минимальные требования для корректной работы сборника:

Node.js 13.14.0
NPM 6.14.4

### Hexlet tests and linter status:

[![Actions Status](https://github.com/val-litvinenko/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/val-litvinenko/frontend-project-46/actions)

[![Maintainability](https://api.codeclimate.com/v1/badges/c731c942768d101ce594/maintainability)](https://codeclimate.com/github/val-litvinenko/frontend-project-46/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/c731c942768d101ce594/test_coverage)](https://codeclimate.com/github/val-litvinenko/frontend-project-46/test_coverage)

Пример работы со сравнением плоских файлов JSON с использованием форматтера stylish
https://asciinema.org/a/a0CNpmXJepkbaAtTy47TdsDnA

Пример работы со сравнением плоских файлов YAML с использованием форматтера stylish
https://asciinema.org/a/hIi0rKS335IF5bdT5UMDFmPJy

Пример работы со сравнением вложенных файлов JSON с использованием форматтера stylish
https://asciinema.org/a/Ph4UTRDvAfhMHUj5E56CYq55T

Пример работы со сравнением вложенных и плоских файлов с использованием форматтера plain
https://asciinema.org/a/ss7XM4i3oRxnnpxxLPlDbXGkP

Пример работы со сравнением вложенных и плоских файлов с использованием форматтера json
https://asciinema.org/a/TG1dCauBihgmDJUpfX2lChG4M
