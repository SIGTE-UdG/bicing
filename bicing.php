<?php

#sudo apt-get install php5-mongo
#sudo /etc/init.d/apache2 restart

header('Access-Control-Allow-Origin: *');

//$server = "mongodb://sigte:proves@127.0.0.1:27017/bdigital";

//$server = "mongodb://127.0.0.1:27017/mydb";


//$m = new Mongo($server);

//$db = $m->selectDB("mydb");

//$collection = new MongoCollection($db, 'twittertest');

//$cursor = $collection->find(Array(), array('geo' => '1'));
//$cursor = $collection->find({})->limit(10000);
//$cursor = $collection->find()->limit(10000);

$bicing_file = file_get_contents('http://wservice.viabicing.cat/v2/stations');
$bicing_decode = json_decode($bicing_file);


/*
$dades = Array();

$i=0;
foreach ($cursor as $doc) {
	
    $tags = Array();
    if(isset($doc['entities']) && isset($doc['id'])){

    	if(count($doc['entities']['hashtags'])>0){
		foreach($doc['entities']['hashtags'] as $tag){
			$tags[]=$tag['text'];
		}
	}
	
	$t = Array(
		'id'=>$doc['id']
		//'msg'=>$doc['text'],
		//'created_at'=>$doc['text'],
		//'coor_x'=>$doc['coordinates']['coordinates'][0],
		//'coor_y'=>$doc['coordinates']['coordinates'][1],
		//'tags'=>implode(',',$tags),
		//'user_id'=>$doc['user']['id'],
		//'user_location'=>$doc['user']['location'],
		//'user_name'=>$doc['user']['name'],
		//'user_lang'=>$doc['user']['lang']		
	);
	$dades[]=$t;
    }
$i++;
}
*/

//echo json_encode($dades);
echo json_encode($bicing_decode);

