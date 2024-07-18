---
symlink: 
symlinkchapter: TEST5
---



## Notes
----




### Команды

---

```yaml
aws s3 ls 
```

Посмотреть содержимое конкретного бакет
```yaml
aws s3 ls s3://contents3data
```

Посмотреть содержимое конкретного бакета под конкретным профилем (не дефолтовым)
```yaml
aws --profile admin s3 ls s3://s12345/
```

Загрузить локальный файл в конкретный бакет
```yaml
aws s3 cp /data/www/file.dat s3://s12345/
```

Загруить локальный файл /data/www/file.dat в S3 bucket «s12345» с добавлением HTTP-заголовка "Cache-Control: max-age=604800"
```yaml
aws s3 cp /data/www/file.dat s3://s12345/ --cache-control max-age=604800
```

Синхронизировать S3 bucket «s12345» с содержимым директории /data/www/ (из дирректории в бакет)
```yaml
aws s3 sync /data/www/ s3://s12345/
```

Удалить файл
```yaml
aws s3 rm s3://s12345/file.dat
```

Удаление всех файлов из конкретного бакета.
```yaml
aws s3 rm s3://s12345/ --recursive
```

Удалить бакет
```yaml
aws s3 rb s3://s12345
```



## Links
----------

## References
------------
https://docs.aws.amazon.com/cli/latest/userguide/cli-services-s3-commands.html

## Zero-links
----
[[00 AWS]]