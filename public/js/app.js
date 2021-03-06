var name = getQueryVariable('name') || "Anon";
var room = getQueryVariable('room');
var socket = io();

socket.on("connect", function(){
	console.log("Connected to socket.io");
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on("message", function(message){
	var momentTimestamp = moment.utc(message.timestamp);
	var $messages = jQuery('.messages');
	var $room = jQuery('.room-title');
	var $message = jQuery('<li class="list-group-item"></li>');

	$room.text(room);
	$message.append('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
	$messages.append($message);
});

//message submisssion
var $form = jQuery("#message-form");

$form.on("submit", function(event){
	var $message = $form.find('input[name=message]');
	event.preventDefault();
	socket.emit("message", {
		name: name,
		room: room,
		text: $message.val()
	});

$message.val("");

});