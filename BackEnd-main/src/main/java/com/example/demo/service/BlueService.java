package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.bluetooth;
import com.example.demo.repository.Bluerepo;

@Service
public class BlueService {
@Autowired
private Bluerepo repo;
public bluetooth addbluetooth(bluetooth obj)
{
	return repo.save(obj);
}
public List<bluetooth>getAllbluetooth()
{
	return repo.findAll();
}
public String delete(int id)
{
	repo.deleteById(id);
	return "deleted";
}
public List<bluetooth>q()
{
	List<bluetooth>c=repo.findAll();
	return c;
}
public bluetooth update(int id,bluetooth obj)
{
	return repo.saveAndFlush(obj);
}
}
