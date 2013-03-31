package co.uk.robohome.voicerecognition;

import java.util.ArrayList;

public class Room {
	
	private String name;
	private int id;
	private ArrayList<Item> items = new ArrayList<Item>();
	
	public Room(int id, String name){
		this.id = id;
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public ArrayList<Item> getItems() {
		return items;
	}

	public void addItem(Item item) {
		this.items.add(item);
	}
	
	@Override
	public String toString() {
		return "Room [name=" + name + ", id=" + id + ", items=" + items + "]";
	}

}
