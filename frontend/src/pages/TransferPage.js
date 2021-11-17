import React, { useEffect, useState } from 'react';
import ContainerComponent from '../components/ContainerComponent';
import { create, store } from '../api/transfer.api'

const TransferPage = () => {
  const [formData, setFormData] = useState({
    account: '',
    amount: 0
  });
  const [accounts, setAccounts] = useState([]);
  const [banks, setBanks] = useState([]);
  const [accountSelected, setAccountSelected] = useState({
    name: '',
    email: '',
    bankName: '',
    accountType: ''
  });

  const getData = async () => {
    await create().then((response) => {
      const { accountBook, banks: listBanks } = response.resources;
      setAccounts(accountBook);
      setBanks(listBanks);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const handleOnChange = (el) => {
    const { value, name, tagName } = el.target;
    setFormData({
      ...formData,
      [name]: value
    })
    if (tagName === 'SELECT') {
      findInformation(value)
    }
  }

  const findInformation = (id) => {
    const { name, email, bankId, accountType: acType } = accounts.filter(item => item.id === Number(id))[0];
    const { name: bankName } = banks.filter(item => item.id === bankId)[0];
    const { name: accountType } = acType;
    setAccountSelected({ name, email, bankName, accountType })
  }

  const handleSubmit = async (el) => {
    el.preventDefault();
    console.log(formData);
    // await store(formData)
  }

  return (
    <ContainerComponent>
      <div className="grid grid-cols-4 gap-1">
        <div className="mt-5 md:mt-0 md:col-span-2">
          <form action="#" method="POST" onSubmit={handleSubmit}>
            <div className="shadow overflow-hidden sm:rounded-md">
              <div className="px-4 py-5 bg-white sm:p-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-3">
                    <div className="grid grid-cols-12 gap-1">
                      <div className="col-span-12">
                        <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">Destinatario</label>
                        <select
                          id="accountType"
                          name="accountType"
                          onChange={handleOnChange}
                          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                          <option>--Seleccione--</option>
                          {
                            accounts.map(item => (
                              <option key={item.id} value={item.id}>{item.name}</option>
                            ))
                          }
                        </select>
                      </div>
                      <div className="col-span-12">
                        <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700">Monto</label>
                        <input
                          type="text"
                          name="accountNumber"
                          id="accountNumber"
                          onChange={handleOnChange}
                          className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <div>Detalle del destinatario</div>
                    <div>Nombre: <small>{accountSelected.name}</small></div>
                    <div>Correo: <small>{accountSelected.email}</small></div>
                    <div>Banco: <small>{accountSelected.bankName}</small></div>
                    <div>Tipo de cuenta: <small>{accountSelected.accountType}</small></div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ContainerComponent>
  );
};

export default TransferPage;
