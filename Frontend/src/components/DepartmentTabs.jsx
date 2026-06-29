function DepartmentTabs({
  departments,
  selectedDepartment,
  setSelectedDepartment,
}) {
  return (
    <>
      <div className="d-flex flex-wrap gap-2 mb-4">

        {departments.map((department) => (
          <button
            key={department.value}
            className={`btn ${
              selectedDepartment === department.value
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() =>
              setSelectedDepartment(department.value)
            }
          >
            {department.label}
          </button>
        ))}

      </div>
    </>
  );
}

export default DepartmentTabs;