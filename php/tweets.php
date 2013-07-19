<?php
$tweet = "@BobBarker is going to #blahblah and also @BillyBob";
echo writeLinks($tweet);

function writeLinks($tweet){
        //for mentions
	$tweet = preg_replace("/\B[@]([a-zA-Z0-9_]{1,20})/i", '<a target="_blank" class="twtr-atreply" href="http://twitter.com/intent/user?screen_name\=$1">$1</a>',$tweet);
	//for hashtags
	 $tweet = preg_replace("/(^|\s+)#(\w+)/i", '<a target="_blank" class="twtr-hashtag" href="http://twitter.com/search\?q=%23$1>#$1</a>', $tweet);
	return $tweet;
}

?>
