
# Table of contents

- [**Documentation**] (#Documentation)
    - [**API**] (#API)
        - [**URL (http://www.robohome.com/ip/version/)**] (#URL)
        - [**/getHouseStructure**] (#/getHouseStructure)
        - [**/setHouseStructure**] (#/setHouseStructure)
        - [**/getHouseState**] (#/getHouseState)
        - [**/getRules**] (#/getRules)
        - [**/getAllMethods**] (#/getAllMethods)

# Documentation

## API

### URL
<pre>
http://www.robohome.com/ip/version/
</pre>

<p>Example</p>
<pre>
http://www.robohome.com/ip/version/rooms/lounge/doors/1/setOpen?percentage=50
</pre>

<p>Wrapper string</p>
<pre>
{statusCode: <statusCode>, content: {} }
</pre>

### /getHouseStructure
<pre>
content : {
  rooms: [
		{
			id: <roomId1 (int)>,
			name: <roomName (string)>,
			items: [
				{
					id: <itemId (int)>,
					name: <itemName (string)>,
					type: <itemType (string)>,
					brand: <itemBrand (string)>,
					ip: <itemIP (string)>,
				},
			]
		},
		{
			..
		},
	]
}
</pre>

### /setHouseStructure
Same as /getHouseStructure, with nullable/undefinable room / item ids for newly-defined rooms and items

<pre>
content : {
	rooms: [
		{
			id: <roomId1 (int)>,
			name: <roomName (string)>,
			items: [
				{
					id: <itemId (int / JS undefined)>,
					name: <itemName (string)>,
					type: <itemType (string)>,
					brand: <itemBrand (string)>,
					ip: <itemIP (string)>,
				},
			]
		},
		{
			..
		},
	]
}
</pre>

### /getHouseState
<pre>
content: {
	states: [
		{
			id: <id (int)>,
			state: <state (int)>
		},
		{
			..
		}
	]
}
</pre>

### /getRules
<pre>
content: {
	rules: [
		{ // single rule
			action: {
				actionId: <ruleId>, // rule id
				sensorId: <itemId (int)>,
				roomId: <roomId (int)>, // both null => house
				sensorName: <name (string)>,
				type: <itemType / time passes (string)>,
				state: <itemState (int) -- triggering state>,
				enabled: <true/false (bool)>
			},
			conditions: [ // per sensor basis
				{
				// device
				itemId: <itemId (int)>,
				type: <itemType (string)>,
				method: <function (noargs)>,
				equivalence: <gt/lt/eq (string)>,
				value: <number/bool/time (long)>
				},
				{
					..
				}
			],
			results: [
				{
				id: <itemId (int)>,
				type: <itemType (string)>,
					sensorId: <itemId (int)>,
					roomId: <roomId (int)>, //both null=>house
				method: <function (noargs, void)>
				},
				{
					..
				}
			]
		},
		{ // 2nd rule
			..
		}
	]
}
</pre>


### /getAllMethods
CACHED

<pre>
content: {
	methodList: [
		{
			type: <itemType (string)>, // discrete type
			methods: [
				{name: “open”, equivalences: [“equals”]},
				{name: “closed”, equivalences: [“equals”]},
				..
			]
		},
		{
			type: <temperature (string)>, // continuous type
			methods: [
				{
					name: “is”,
					equivalences: [
					“equal to”,
					“greater than”,
					“less than”
					]
				},
				{
					..
				}
			]
		}
	]
}
</pre>
