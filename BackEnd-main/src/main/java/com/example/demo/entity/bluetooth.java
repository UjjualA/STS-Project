package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="BLUETOOTH")
public class bluetooth {
@Id
private int id;
private String Device_name;
private int Connected;
private String Status;
private String Password;
private String Limited;
public int getId() {
	return id;
}
public void setId(int id) {
	this.id = id;
}
public String getDevice_name() {
	return Device_name;
}
public void setDevice_name(String device_name) {
	Device_name = device_name;
}
public int getConnected() {
	return Connected;
}
public void setConnected(int connected) {
	Connected = connected;
}
public String getStatus() {
	return Status;
}
public void setStatus(String status) {
	Status = status;
}
public String getPassword() {
	return Password;
}
public void setPassword(String password) {
	Password = password;
}
public String getLimited() {
	return Limited;
}
public void setLimited(String limited) {
	Limited = limited;
}
public bluetooth(int id, String device_name, int connected, String status, String password, String limited) {
	super();
	this.id = id;
	Device_name = device_name;
	Connected = connected;
	Status = status;
	Password = password;
	Limited = limited;
}
public bluetooth()
{
	
}
}
