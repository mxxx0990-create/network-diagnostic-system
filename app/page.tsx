"use client";

import React, { useState } from 'react';
import { devices, symptoms, solutions } from './data/database';

export default function DiagnosticTool() {
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<number[]>([]);

  const handleDeviceSelect = (id: number) => {
    setSelectedDeviceId(id);
    setSelectedSymptoms([]); 
  };

  const toggleSymptom = (symptomId: number) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptomId) 
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const filteredSolutions = solutions.filter(sol => 
    selectedSymptoms.includes(sol.symptom_id)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Низоми ташхиси таҷҳизоти шабакавӣ</h1>
          <p className="text-blue-100 mt-2">Пойгоҳи дониш барои дарёфт ва бартарафсозии нуқсонҳо</p>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Таҷҳизотро интихоб кунед:</h2>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {devices.map(device => (
              <div 
                key={device.id}
                onClick={() => handleDeviceSelect(device.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedDeviceId === device.id 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <h3 className="font-bold text-lg text-gray-800">{device.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{device.description}</p>
              </div>
            ))}
          </div>

          {selectedDeviceId && (
            <div className="mb-8 animate-fade-in">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Аломатҳои нуқсонро қайд кунед:</h2>
              <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                {symptoms.filter(s => s.device_id === selectedDeviceId).map(symptom => (
                  <label key={symptom.id} className="flex items-center space-x-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={selectedSymptoms.includes(symptom.id)}
                      onChange={() => toggleSymptom(symptom.id)}
                    />
                    <span className="text-gray-700">{symptom.description}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {selectedSymptoms.length > 0 && (
            <div className="animate-fade-in border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">3. Натиҷаи ташхис ва роҳҳои ҳал:</h2>
              <div className="space-y-6">
                {filteredSolutions.map(solution => (
                  <div key={solution.id} className="bg-green-50 border border-green-200 rounded-lg p-5">
                    <div className="mb-3">
                      <span className="font-bold text-green-800 block text-sm uppercase tracking-wide">Диагноз (Сабаб):</span>
                      <p className="text-gray-800 mt-1">{solution.root_cause}</p>
                    </div>
                    <div>
                      <span className="font-bold text-green-800 block text-sm uppercase tracking-wide mb-2">Дастурамали бартарафсозӣ:</span>
                      <ul className="list-decimal list-inside space-y-1">
                        {solution.resolution_steps.map((step, idx) => (
                          <li key={idx} className="text-gray-700">{step}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}