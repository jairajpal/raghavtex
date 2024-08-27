// Extract unique values for dropdowns
const receivings = useMemo(
  () => Array.from(new Set(productsData.map((item) => item.receiving))),
  [productsData]
);

const receivingOptions = receivings.map((receiving) => ({
  label: receiving,
  value: receiving,
}));

const handleReceivingChange = (selectedOption: any) => {
  handleChange({
    target: {
      name: "receiving",
      value: selectedOption ? selectedOption.value : "",
    },
  });
};
