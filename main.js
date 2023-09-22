$(document).ready(function(){
    $('#btn-buscar-cep').click(function(){
        const cep = $('#cep').val();
        const endpoint = `https://viacep.com.br/ws/${cep}/json`;

        $(this).find('i').addClass('d-none');
        $(this).find('span').removeClass('d-none');

        $.ajax(endpoint).done(function(resposta){
            if (resposta && !resposta.erro) {
                const logradouro = resposta.logradouro || '';
                const bairro = resposta.bairro || '';
                const cidade = resposta.localidade || '';
                const estado = resposta.uf || '';

                const endereco = `${logradouro}, ${bairro} - ${cidade} - ${estado}`;
                $('#endereco').val(endereco);
                setTimeout(function(){
                    $('#btn-buscar-cep').find('i').removeClass('d-none');
                    $('#btn-buscar-cep').find('span').addClass('d-none');
                    
                }, 2000);

            } else {
                // Lidar com o caso em que o CEP não foi encontrado ou ocorreu um erro.
                $('#endereco').val('CEP não encontrado');
                
                $('#btn-buscar-cep').find('i').removeClass('d-none');
                $('#btn-buscar-cep').find('span').addClass('d-none');
            }
        })
        .fail(function(){
            // Lidar com falha na solicitação Ajax.
            $('#endereco').val('Erro ao buscar o CEP');

            $('#btn-buscar-cep').find('i').removeClass('d-none');
            $('#btn-buscar-cep').find('span').addClass('d-none');
        });
    });
});
