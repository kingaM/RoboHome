package co.uk.robohome.voicerecognition;

import java.util.ArrayList;

public class Item {
	
	private String name;
	private int id;
	private ArrayList<String> methods = new ArrayList<String>();
	
	public Item(int id, String name){
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

	public ArrayList<String> getMethods() {
		return methods;
	}

	public void addMethod(String method) {
		this.methods.add(method);
	}

	@Override
	public String toString() {
		return "Item [name=" + name + ", id=" + id + ", methods=" + methods
				+ "]";
	}
	
}
