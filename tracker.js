let jobs = [
  {id:1, company:"Mobile First Corp", position:"React Native Developer", location:"Remote", type:"Full-time", salary:"$130,000 - $175,000", description:"Build cross-platform mobile applications used by millions worldwide.", status:"all"},
  {id:2, company:"WebFlow Agency", position:"Web Designer & Developer", location:"Los Angeles", type:"Part-time", salary:"$60,000 - $82,000", description:"Create responsive websites for high-profile clients.", status:"all"},
  {id:3, company:"Dataviz Solutions", position:"Data Visualization Specialist", location:"Boston", type:"Full-time", salary:"$82,000 - $95,000", description:"Transform complex data into interactive dashboards.", status:"all"},
  {id:4, company:"CloudFirst Inc", position:"Backend Developer", location:"Seattle", type:"Full-time", salary:"$100,000 - $130,000", description:"Design APIs and manage modern cloud infrastructure.", status:"all"},
  {id:5, company:"Innovation Labs", position:"UI/UX Engineer", location:"Austin", type:"Full-time", salary:"$90,000 - $110,000", description:"Design clean interfaces for scalable digital products.", status:"all"},
  {id:6, company:"MegaCorp Solutions", position:"JavaScript Developer", location:"New York", type:"Full-time", salary:"$85,000 - $110,000", description:"Develop modern web applications using JavaScript.", status:"all"},
  {id:7, company:"StartupXYZ", position:"Full Stack Engineer", location:"Remote", type:"Full-time", salary:"$95,000 - $120,000", description:"Build scalable applications using modern tech stacks.", status:"all"},
  {id:8, company:"TechCorp Industries", position:"Senior Frontend Developer", location:"San Francisco", type:"Full-time", salary:"$130,000 - $175,000", description:"Lead frontend architecture and mentor junior developers.", status:"all"},
];

let currentTab = "all";

function renderJobs(){
  const container = document.getElementById("jobsContainer");
  container.innerHTML = "";

  let filtered = jobs.filter(job => currentTab==="all" || job.status===currentTab);

  document.getElementById("tabCount").innerText = filtered.length + " jobs";

  if(filtered.length===0){
   container.innerHTML = `
    <div class="bg-white rounded-xl border border-gray-200 p-16 text-center">

      <!-- Your Image -->
      <div class="flex justify-center mb-6">
        <img src="./jobs.png" 
             alt="No jobs"
             class="w-28 h-28 object-contain">
      </div>

      <h3 class="text-lg font-semibold text-gray-800">
        No jobs available
      </h3>

      <p class="text-gray-500 mt-2">
        Check back soon for new job opportunities
      </p>

    </div>
  `;

  updateCounts();
  return;;
    
  }

  filtered.forEach(job=>{
    container.innerHTML += `
      <div class="bg-white p-6 rounded-xl shadow relative">

        <!-- Delete -->
        <button onclick="deleteJob(${job.id})"
          class="absolute top-5 right-5 text-gray-400 hover:text-red-500">
       <i class="fa-regular fa-trash-can"></i>
        </button>

        <h3 class="text-lg font-semibold text-gray-800">${job.company}</h3>
        <p class="text-gray-600">${job.position}</p>

        <p class="text-sm text-gray-500 mt-2">
          ${job.location} • ${job.type} • ${job.salary}
        </p>

        <div class="mt-4">
          <span class="px-3 py-1 text-xs rounded-md bg-gray-200">
            ${job.status === "all" ? "NOT APPLIED" : job.status.toUpperCase()}
          </span>
        </div>

        <p class="text-gray-600 mt-4 text-sm leading-relaxed">
          ${job.description}
        </p>

        <div class="flex gap-4 mt-6">
          <button onclick="setStatus(${job.id}, 'interview')"
            class="px-5 py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50">
            Interview
          </button>

          <button onclick="setStatus(${job.id}, 'rejected')"
            class="px-5 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50">
            Rejected
          </button>
        </div>

      </div>
    `;
  });

  updateCounts();
}

function setStatus(id,status){
  let job = jobs.find(j=>j.id===id);
  job.status = job.status===status ? "all" : status;
  renderJobs();
}

function deleteJob(id){
  jobs = jobs.filter(j=>j.id!==id);
  renderJobs();
}

function changeTab( event, tab){
  currentTab = tab;

  document.querySelectorAll(".tab-btn").forEach(btn=>{
    btn.classList.remove("bg-blue-600","text-white");
    btn.classList.add("bg-gray-200");
  });
  event.target.classList.remove("bg-gray-200")
  event.target.classList.add("bg-blue-600","text-white");

  renderJobs();
}

function updateCounts(){
  document.getElementById("totalCount").innerText = jobs.length;
  document.getElementById("interviewCount").innerText =
    jobs.filter(j=>j.status==="interview").length;
  document.getElementById("rejectedCount").innerText =
    jobs.filter(j=>j.status==="rejected").length;
}

renderJobs();