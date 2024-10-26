const userForm = document.getElementById("user-form");
const userList = document.getElementById("user-list");
const editForm = document.getElementById("edit-form");
const cancelEditBtn = document.getElementById("cancel-edit");

let currentUserId = null; // Store the ID of the user being edited
setDefaultRecordDate();

function setDefaultRecordDate() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");

  // Format for date (yyyy-mm-dd) and time (hh:mm)
  const formattedDate = `${yyyy}-${mm}-${dd}`;
  const formattedTime = `${hh}:${min}`;

  // Set the default value of the date and time fields
  document.getElementById("recordDate").value = formattedDate;
  document.getElementById("productionTime").value = formattedTime;

}
// Function to add a new production entry
userForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const department = document.getElementById("department").value;
  const line = document.getElementById("line").value;
  const orderNumber = document.getElementById("orderNumber").value;
  const productCode = document.getElementById("productCode").value;
  const productName = document.getElementById("productName").value;
  const productUnit = document.getElementById("productUnit").value;
  const productQuantity = document.getElementById("productQuantity").value;
  const requestedDate = document.getElementById("requestedDate").value;
  const productionDate = document.getElementById("productionDate").value;
  const producedQuantity = document.getElementById("producedQuantity").value;
  const finishDate = document.getElementById("finishDate").value;
  const productionStatus = document.getElementById("productionStatus").value;
  const recordDate = document.getElementById("recordDate").value;
  const productionTime = document.getElementById("productionTime").value;

  await fetch("http://localhost:4000/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      department,
      line,
      orderNumber,
      productCode,
      productName,
      productUnit,
      productQuantity,
      requestedDate,
      productionDate,
      producedQuantity,
      finishDate,
      productionStatus,
      recordDate,
      productionTime,
    }),
  });
  loadUsers(); // Change this function name if necessary
  userForm.reset();
});

// Function to load production entries
async function loadUsers() {
  const response = await fetch("http://localhost:4000/users");
  const users = await response.json();
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.department} - ${user.line} - ${user.orderNumber} - ${user.productCode} - ${user.productName} - ${user.productUnit} - ${user.productQuantity} - ${user.requestedDate} - ${user.productionDate} - ${user.producedQuantity} - ${user.finishDate} - ${user.productionStatus} - ${user.recordDate} - ${user.productionTime}`;

    // Delete button for the product
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = async () => {
      await fetch(`http://localhost:4000/users/${user.id}`, {
        method: "DELETE",
      });
      loadUsers();
    };

    // Edit button for the product
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => {
      currentUserId = user.id;
      document.getElementById("edit-department").value = user.department;
      document.getElementById("edit-line").value = user.line;
      document.getElementById("edit-orderNumber").value = user.orderNumber;
      document.getElementById("edit-productCode").value = user.productCode;
      document.getElementById("edit-productName").value = user.productName;
      document.getElementById("edit-productUnit").value = user.productUnit;
      document.getElementById("edit-productQuantity").value = user.productQuantity;
      document.getElementById("edit-requestedDate").value = user.requestedDate;
      document.getElementById("edit-productionDate").value = user.productionDate;
      document.getElementById("edit-producedQuantity").value = user.producedQuantity;
      document.getElementById("edit-finishDate").value = user.finishDate;
      document.getElementById("edit-productionStatus").value = user.productionStatus;
      document.getElementById("edit-recordDate").value = user.recordDate;
      document.getElementById("edit-productionTime").value = user.productionTime;

      editForm.style.display = "block";
      userForm.style.display = "none";
    };

    li.appendChild(deleteButton);
    li.appendChild(editButton);
    userList.appendChild(li);
  });
}

// Function to edit product details
editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const department = document.getElementById("edit-department").value;
  const line = document.getElementById("edit-line").value;
  const orderNumber = document.getElementById("edit-orderNumber").value;
  const productCode = document.getElementById("edit-productCode").value;
  const productName = document.getElementById("edit-productName").value;
  const productUnit = document.getElementById("edit-productUnit").value;
  const productQuantity = document.getElementById("edit-productQuantity").value;
  const requestedDate = document.getElementById("edit-requestedDate").value;
  const productionDate = document.getElementById("edit-productionDate").value;
  const producedQuantity = document.getElementById("edit-producedQuantity").value;
  const finishDate = document.getElementById("edit-finishDate").value;
  const productionStatus = document.getElementById("edit-productionStatus").value;
  const recordDate = document.getElementById("edit-recordDate").value;
  const productionTime = document.getElementById("edit-productionTime").value;

  await fetch(`http://localhost:4000/users/${currentUserId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      department,
      line,
      orderNumber,
      productCode,
      productName,
      productUnit,
      productQuantity,
      requestedDate,
      productionDate,
      producedQuantity,
      finishDate,
      productionStatus,
      recordDate,
      productionTime,
    }),
  });

  loadUsers();
  editForm.style.display = "none";
  userForm.style.display = "block";
});

// Cancel edit action
cancelEditBtn.addEventListener("click", () => {
  editForm.style.display = "none";
  userForm.style.display = "block";
});

loadUsers();
