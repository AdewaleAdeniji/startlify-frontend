import { formatDate } from "../../services/date";

const DashboardTable = ({ emails, handleOpenEmail }) => {
  return (
    <div class="overflow-x-auto">
      <div class="inline-block min-w-full align-middle">
        <div class="overflow-hidden mb-6 rounded-2xl"></div>
        <table class="min-w-full divide-y divide-gray-200 table-fixed">
          <tbody class="bg-white divide-y divide-gray-200">
            {emails.map((email) => {
              return (
                <tr
                  class="cursor-pointer hover:bg-gray-100"
                  onClick={()=> handleOpenEmail(email?.emailAddressID, email?.emailID)}
                >
                  {/* <td class="p-4 w-4">
                    <div class="inline-flex items-center space-x-4">
                      <div>
                        <input
                          id="checkbox-1"
                          aria-describedby="checkbox-1"
                          type="checkbox"
                          class="w-5 h-5 rounded border-gray-300 focus:ring-0 checked:bg-dark-900"
                          onclick="event.stopPropagation();"
                        />
                        <label for="checkbox-1" class="sr-only">
                          checkbox
                        </label>
                      </div>
                      <svg
                        onclick="event.stopPropagation();"
                        class="w-6 h-6 text-gray-500 hover:text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        ></path>
                      </svg>
                    </div>
                  </td> */}
                  <td class="flex items-center p-4 space-x-4 whitespace-nowrap">
                    <img
                      class="w-6 h-6 rounded-full"
                      src="https://flowbite-admin-dashboard.vercel.app/images/logo.svg"
                      alt={email?.emailFrom}
                    />
                    <div class="text-base font-semibold text-gray-900">
                    {email?.emailFrom}
                    </div>
                  </td>
                  <td class="p-4 text-base font-semibold text-gray-900 max-w-sm xl:max-w-screen-md 2xl:max-w-screen-lg truncate overflow-hidden">
                  {email?.subject} - {email?.text}
                  </td>
                  <td class="p-4 whitespace-nowrap text-base font-medium text-gray-900">
                    {formatDate(email?.sendDate)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default DashboardTable;
