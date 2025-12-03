export const feeTypes = [
  {
    id: 1,
    name: "Phí vệ sinh",
    mandatory: true,
    calculation: "per_person",
    rate: 6000,
  },
  {
    id: 2,
    name: "Phí an ninh",
    mandatory: false,
    calculation: "per_household",
    rate: 50000,
  },
  {
    id: 3,
    name: "Phí chiếu sáng",
    mandatory: false,
    calculation: "per_household",
    rate: 20000,
  },
];
