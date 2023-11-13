
# Tests

To run tests you need to create a test database

# Be careful

Create a test database based on your current database:
```bash dsfd
    mongodump --db source_database --out /path_to_save
    mongorestore --db dictionaries-test /path_to_saved_source_db
```

# Run tests 

```bash dsfd
  sudo systemctl start mongod
  npm test
```
