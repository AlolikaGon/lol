if(!('webkitSpeechRecognition' in window)){
	alert("Speech Recognition not supported");
} else{
	var commandsList = [];
	var isListening = false;

	function invokeFunction(speech){
		for(var i in commandsList){
			var temp = i;
			i = new RegExp(i);
			if(i.test(speech)){
				var j = i.toString();
				j = j.replace("/","");
				j = j.replace("/","");
				j = j.replace(".*", " (\\w+)");
				j = new RegExp(j,"g");
				console.log(speech);
				console.log(j);
				var arg = j.exec(speech);
				var arguments;
				for(let a = 1; a<arg.length; ++a){
					arguments[a-1] = arg[a];
				}
				console.log(arguments);
				commandsList[temp](arguments);
				break;
			}else{
				console.log("not found");
			}
		}
	}
	var namedArg = /(.*)\s:\w+(.*)/g; 
	function parseString(rawString){
		var final_string = '';
		var arg = namedArg.exec(rawString);
		if(arg!=null){
			for(let i = 1; i < arg.length; ++i){
				if(i!=1)
					final_string += ".*";
				final_string += arg[i];
			}
		}else{
			final_string = rawString;
		}
		final_string = final_string.toLowerCase();
		console.log(final_string);
		return final_string;
	}
	var lol = {
		init: function(){
			console.log('Init works');
			var recognition = new webkitSpeechRecognition();
			recognition.start();
			recognition.continuous = true;
			recognition.interimResults = true;
			recognition.lang = 'en-IN';

			recognition.onstart = function(){
				isListening = true;
			};

			recognition.onerror = function(){

			};

			recognition.onend = function(){
				isListening = false;
			};

			recognition.onresult = function(event){
				var interim_transcript = '';
				var final_transcript = '';
				for(var i = event.resultIndex ; i<event.results.length; ++i){
					if(event.results[i].isFinal){
						final_transcript += event.results[i][0].transcript;
					} else{
						interim_transcript += event.results[i][0].transcript;
					}
				}
				final_transcript = final_transcript.toLowerCase();
				console.log(final_transcript);
				console.log(interim_transcript);
				invokeFunction(final_transcript);
			};

		},
		
		addCommands: function(command){
			//var c;
			for(let phrase in command){
				if(command.hasOwnProperty(phrase)){
					var parsedPhrase = parseString(phrase);
					commandsList[parsedPhrase] = command[phrase];
				}
			}
			console.log(commandsList);
		}
};
}