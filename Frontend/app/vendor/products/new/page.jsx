export default function NewProductPage() {
  return (
    <main className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Add New Product</h1>
      <form className="max-w-xl space-y-4">
        <div>
          <label className="mb-1 block font-medium">Product name</label>
          <input
            type="text"
            className="w-full rounded border border-gray-300 p-2"
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label className="mb-1 block font-medium">Price per day</label>
          <input
            type="number"
            className="w-full rounded border border-gray-300 p-2"
            placeholder="0"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 font-medium text-white"
        >
          Save Product
        </button>
      </form>
    </main>
  );
}
