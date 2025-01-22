// @api/termofservice.ts
export type TermsOfServiceFormData = {
    title: string;
    content: string;
    
  };
  
  export const editTermsOfService = async (id: number, data: TermsOfServiceFormData) => {
    // Your API call here
    const response = await fetch(`/api/termofservice/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  };
  