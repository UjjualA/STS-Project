package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.bluetooth;
import com.example.demo.service.BlueService;

@CrossOrigin
@RestController
public class Bluecontroller {
@Autowired
private BlueService Blueserv;
@PostMapping("/add")
public bluetooth addbluetooth(@RequestBody bluetooth obj)
{
	return Blueserv.addbluetooth(obj);
}
@GetMapping("/show")
public List<bluetooth>getbluetooth()
{
	List<bluetooth>arr=new ArrayList<>();
	arr=Blueserv.getAllbluetooth();
	
			return arr;
}
@DeleteMapping("/Delete/{id}")
public void delete(@PathVariable int id) {
	Blueserv.delete(id);
}
@PutMapping("/update/{id}")
public bluetooth update(@PathVariable int id,@RequestBody bluetooth obj)
{
	return Blueserv.update(id, obj);
}
}
