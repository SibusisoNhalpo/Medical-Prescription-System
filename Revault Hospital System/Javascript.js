let patients = JSON.parse(localStorage.getItem('patients')) || [];

// Illness to Prescription mapping
const illnessPrescriptions = {
  'fever': 'Paracetamol 500mg twice daily, Hydration therapy, Rest',
  'cold': 'Vitamin C 1000mg daily, Decongestant nasal drops, Throat lozenges',
  'flu': 'Antiviral medication (Oseltamivir), Paracetamol 500mg, Bed rest',
  'headache': 'Aspirin 400mg or Ibuprofen 200mg, Hydration, Rest in dark room',
  'cough': 'Cough syrup (Dextromethorphan), Throat lozenges, Honey, Steam inhalation',
  'asthma': 'Albuterol inhaler, Fluticasone inhaler, Breathing exercises',
  'diabetes': 'Metformin 500mg twice daily, Insulin therapy, Blood sugar monitoring',
  'hypertension': 'Lisinopril 10mg daily, Amlodipine 5mg, Low sodium diet',
  'arthritis': 'Ibuprofen 400mg, Glucosamine supplement, Physical therapy',
  'bronchitis': 'Bronchodilator, Expectorant cough syrup, Antibiotic if bacterial',
  'migraine': 'Sumatriptan 50mg, Ibuprofen 400mg, Dark room rest',
  'anxiety': 'Sertraline 50mg daily, Cognitive behavioral therapy, Meditation',
  'depression': 'Fluoxetine 20mg daily, Psychotherapy, Lifestyle changes',
  'insomnia': 'Melatonin 5mg, Valerian root supplement, Sleep hygiene routine',
  'skin infection': 'Antibiotic cream (Neomycin), Oral antibiotics, Keep area clean and dry',
  'stomach pain': 'Omeprazole 20mg, Antacid tablets, Light bland diet',
  'diarrhea': 'Loperamide 2mg, Electrolyte solution, Hydration, Bland diet',
  'constipation': 'Psyllium husk, Docusate sodium, Increase fiber and water intake',
  'allergies': 'Cetirizine 10mg daily, Loratadine 10mg, Nasal spray, Antihistamines'
};

// Get prescription suggestion based on illness
function getPrescriptionSuggestion(illness) {
  const illnessLower = illness.toLowerCase().trim();
  
  // Direct match
  if (illnessPrescriptions[illnessLower]) {
    return illnessPrescriptions[illnessLower];
  }
  
  // Partial match
  for (let key in illnessPrescriptions) {
    if (key.includes(illnessLower) || illnessLower.includes(key)) {
      return illnessPrescriptions[key];
    }
  }
  
  return null;
}

// Setup event listener for illness input
document.addEventListener('DOMContentLoaded', function() {
  const illnessInput = document.getElementById('pillness');
  const prescriptionInput = document.getElementById('pprescription');
  
  if (illnessInput) {
    illnessInput.addEventListener('blur', function() {
      const suggestion = getPrescriptionSuggestion(this.value);
      if (suggestion) {
        prescriptionInput.value = suggestion;
      }
    });
  }
});

function addPatient() {
  const name = document.getElementById('pname').value.trim();
  const age = document.getElementById('page').value;
  const gender = document.getElementById('pgender').value;
  const illness = document.getElementById('pillness').value.trim();
  const prescription = document.getElementById('pprescription').value.trim();

  if (!name || !age || !illness || !prescription || age <= 0) {
    alert('Please fill all fields correctly');
    return;
  }

  patients.push({ id: Date.now(), name, age, gender, illness, prescription });
  localStorage.setItem('patients', JSON.stringify(patients));
  
  // Clear inputs
  document.getElementById('pname').value = '';
  document.getElementById('page').value = '';
  document.getElementById('pillness').value = '';
  document.getElementById('pprescription').value = '';
  
  renderPatients();
}

function deletePatient(id) {
  if (confirm('Are you sure you want to delete this patient?')) {
    patients = patients.filter(p => p.id !== id);
    localStorage.setItem('patients', JSON.stringify(patients));
    renderPatients();
  }
}

function renderPatients() {
  const list = document.getElementById('patientList');
  list.innerHTML = '';

  if (patients.length === 0) {
    list.innerHTML = '<li class="empty">No patients added yet</li>';
    return;
  }

  patients.forEach((p) => {
    const li = document.createElement('li');
    li.className = 'patient-item';
    li.innerHTML = `
      <div class="patient-details">
        <div class="patient-header">
          <strong>${p.name}</strong>
          <span class="patient-info">${p.age} years, ${p.gender}</span>
        </div>
        <div class="patient-medical">
          <div class="medical-field">
            <span class="label">Illness:</span> <span class="value">${p.illness}</span>
          </div>
          <div class="medical-field">
            <span class="label">Prescription:</span> <span class="value">${p.prescription}</span>
          </div>
        </div>
      </div>
      <button class="delete-btn" onclick="deletePatient(${p.id})">Delete</button>
    `;
    list.appendChild(li);
  });
}

renderPatients();