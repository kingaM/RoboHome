package uk.co.robohome;

import java.util.ArrayList;
import java.util.HashMap;

public class Room {
	
	private String name;
	private int id;
	private HashMap<String, Item> items = new HashMap<String, Item>();
	
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

	public void addItem(Item item) {
		this.items.put(item.getName().toLowerCase(), item);
	}
	
	public boolean inItems(String name) {
		return items.containsKey(name);
	}
	
	public int getItemId(String name) {
		return items.get(name).getId();
	}
	
	@Override
	public String toString() {
		return "Room [name=" + name + ", id=" + id + ", items=" + items + "]";
	}

}
