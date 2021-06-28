list_to_json () {
  local json="["
  local comma=
  for p in $*
  do
    if [ $comma ]
    then
      json="$json,"
    else
      comma="true"
    fi
    json="$json\"$p\""
  done
  json="$json]"
  echo "::set-output name=json::$json"
}
list_to_json $*
