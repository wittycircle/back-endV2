read -s -p "Enter Password [mysql] : " mypassword;
echo '';
echo "Enter database name for creation. Caution, if it exists, it will be destroyed";
read  -p "Enter database name : " newdb;

echo 'Enter OLD database name to import from';
read  -p "Enter database name : " oldb;

/usr/local/mysql/bin/mysql -uroot -p${mypassword} -Bse "drop database IF EXISTS ${newdb} ; create database ${newdb}" 2>/dev/null;
node index.js ${newdb} ${mypassword};
node fill_tables ${newdb} ${mypassword} ${oldb};

