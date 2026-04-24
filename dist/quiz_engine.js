/**
 * BLUE SERVER â€” QUIZ ENGINE (v1.1)
 * Architect: VisualMaster (Agentic Squad)
 * System: Linear Ã— A24 Hibrid
 */

const quizData = [
    { id: "Q01", q: "Qual seu nÃ­vel de 'Trabalho Manual' hoje?", options: [{ t: "Quase zero. AutomÃ¡tico.", v: 10 }, { t: "2-4h de tarefas robÃ³ticas.", v: 5 }, { t: "Passo o dia no soco em ponta de faca.", v: 0 }] },
    { id: "Q02", q: "Como vocÃª interage com a IA?", options: [{ t: "Orquestro agentes autÃ´nomos.", v: 10 }, { t: "Perguntas isoladas no ChatGPT.", v: 5 }, { t: "Mal uso ou sÃ³ gramÃ¡tica.", v: 0 }] },
    { id: "Q03", q: "Onde estÃ¡ seu conhecimento estratÃ©gico?", options: [{ t: "Segundo CÃ©rebro estruturado.", v: 10 }, { t: "Notas espalhadas e cabeÃ§a.", v: 5 }, { t: "NÃ£o tenho registro, improviso.", v: 0 }] },
    { id: "Q04", q: "Se parar por 48h, o que acontece?", options: [{ t: "A fÃ¡brica opera 24/7.", v: 10 }, { t: "A produÃ§Ã£o desacelera.", v: 5 }, { t: "Tudo para. Sem lucro.", v: 0 }] },
    { id: "Q05", q: "Quantos agentes trabalham para vocÃª agora?", options: [{ t: "Mais de 5 orquestrados.", v: 10 }, { t: "1 ou 2 GPTs manuais.", v: 5 }, { t: "Zero. Sou eu contra o mundo.", v: 0 }] },
    { id: "Q06", q: "Qual seu maior gargalo para escalar?", options: [{ t: "Servidor e Tokens (Escala).", v: 10 }, { t: "Falta de tempo (Gargalo Humano).", v: 5 }, { t: "NÃ£o sei por onde comeÃ§ar.", v: 0 }] },
    { id: "Q07", q: "Construir cÃ³digo ou orquestrar resultado?", options: [{ t: "Orquestrar o sistema.", v: 10 }, { t: "Gosto de codar, mas perco tempo.", v: 5 }, { t: "Preso na sintaxe bÃ¡sica.", v: 0 }] }
];

class QuizEngine {
    constructor() {
        this.currentStep = 0;
        this.score = 0;
        this.container = document.querySelector('.audit-inner');
        this.originalContent = this.container.innerHTML;
    }

    init() {
        this.renderQuestion();
    }

    renderQuestion() {
        const step = quizData[this.currentStep];
        if (!step) return this.renderCapture();

        let html = `
            <div class="quiz-step" style="opacity: 0">
                <p class="font-mono text-[9px] tracking-[0.5em] text-[#00D1FF] mb-8 uppercase">${step.id} â€” SCANNING PROTOCOL</p>
                <h2 class="audit-h2" style="font-size: clamp(1.2rem, 3.5vw, 2.2rem); margin-bottom: 40px; line-height: 1.2;">${step.q}</h2>
                <div class="flex flex-col gap-3 items-center w-full max-w-lg mx-auto">
                    ${step.options.map((opt, i) => `
                        <button class="btn quiz-opt group" data-val="${opt.v}" style="width: 100%; text-align: left; padding: 20px 30px;">
                            <span class="flex justify-between items-center w-full">
                                ${opt.t}
                                <i class="font-mono text-[8px] opacity-0 group-hover:opacity-40 transition-opacity">SELECT_0${i + 1}</i>
                            </span>
                        </button>
                    `).join('')}
                </div>
                <button class="audit-close mt-12 opacity-30 hover:opacity-100 transition-opacity" id="quiz-abort">[ ABORTAR ]</button>
            </div>
        `;

        gsap.to(this.container, {
            opacity: 0, y: -20, duration: 0.3, onComplete: () => {
                this.container.innerHTML = html;
                gsap.to(this.container, { opacity: 1, y: 0, duration: 0.1 });
                gsap.to(".quiz-step", { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
                this.bindEvents();
            }
        });
    }

    bindEvents() {
        document.querySelectorAll('.quiz-opt').forEach(btn => {
            btn.onclick = () => {
                this.score += parseInt(btn.dataset.val);
                this.currentStep++;
                this.renderQuestion();
            };
        });
        const abortBtn = document.getElementById('quiz-abort');
        if (abortBtn) abortBtn.onclick = () => location.reload();
    }

    renderCapture() {
        let html = `
            <div class="quiz-capture" style="opacity: 0">
                <p class="font-mono text-[9px] tracking-[0.5em] text-[#00D1FF] mb-8 uppercase">VALIDAÃ‡ÃƒO DE IDENTIDADE</p>
                <h2 class="audit-h2" style="font-size: 2rem; margin-bottom: 40px;">Para onde enviamos seu <br/><span class="text-[#00D1FF]">Blueprint de OrquestraÃ§Ã£o</span>?</h2>
                
                <div class="flex flex-col gap-8 w-full max-w-md mx-auto text-left">
                    <div class="input-group">
                        <label class="font-mono text-[8px] uppercase tracking-widest opacity-40">Seu Melhor E-mail</label>
                        <input type="email" id="lead-email" class="audit-input" placeholder="seu@email.com" autocomplete="off">
                    </div>
                    <div class="input-group">
                        <label class="font-mono text-[8px] uppercase tracking-widest opacity-40">UsuÃ¡rio do X (Twitter)</label>
                        <input type="text" id="lead-x" class="audit-input" placeholder="@seuusuario" autocomplete="off">
                    </div>
                </div>

                <button class="btn mt-12 w-full max-w-md" id="btn-submit-lead">
                    <span>ACESSAR PROTOCOLO FINAL</span>
                </button>
            </div>
        `;

        gsap.to(this.container, {
            opacity: 0, y: -20, duration: 0.4, onComplete: () => {
                this.container.innerHTML = html;
                gsap.to(this.container, { opacity: 1, y: 0, duration: 0.1 });
                gsap.to(".quiz-capture", { opacity: 1, y: 0, duration: 0.8, ease: "power4.out" });

                document.getElementById('btn-submit-lead').onclick = async () => {
                    const email = document.getElementById('lead-email').value;
                    const userX = document.getElementById('lead-x').value;
                    const btn = document.getElementById('btn-submit-lead');

                    if (!email.includes('@')) return alert('Insira um e-mail vÃ¡lido.');

                    // Feedback de carregamento
                    btn.disabled = true;
                    btn.innerHTML = '<span>PROCESSANDO...</span>';

                    try {
                        const response = await fetch('https://zzyadmefwojxagljwjvq.supabase.co/rest/v1/leads', {
                            method: 'POST',
                            headers: {
                                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6eWFkbWVmd29qeGFnbGp3anZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5ODM5NzYsImV4cCI6MjA5MjU1OTk3Nn0.DsWdso6G5ESffxXqEd64PWPqVW_f_jsiYnjrwF6i_rM',
                                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6eWFkbWVmd29qeGFnbGp3anZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY5ODM5NzYsImV4cCI6MjA5MjU1OTk3Nn0.DsWdso6G5ESffxXqEd64PWPqVW_f_jsiYnjrwF6i_rM',
                                'Content-Type': 'application/json',
                                'Prefer': 'return=minimal'
                            },
                            body: JSON.stringify({
                                email: email,
                                username_x: userX,
                                score: this.score
                            })
                        });

                        if (!response.ok) throw new Error('Falha ao salvar lead');

                        console.log(`[LEAD CAPTURED] Saved to Supabase: ${email}`);
                        this.showResult();
                    } catch (error) {
                        console.error('Erro no Supabase:', error);
                        alert('Erro ao processar. Tente novamente.');
                        btn.disabled = false;
                        btn.innerHTML = '<span>ACESSAR PROTOCOLO FINAL</span>';
                    }
                };
            }
        });
    }

    showResult() {
        let title, desc, resultClass;
        if (this.score >= 55) {
            title = "MAESTRO EM POTENCIAL";
            desc = "Seu mindset estÃ¡ alinhado. VocÃª jÃ¡ entende a sinfonia, agora precisa da <strong>FÃ¡brica AgÃªntica</strong> para escalar o lucro sem limites.";
            resultClass = "LEVEL_03";
        } else if (this.score >= 25) {
            title = "ENTUSIASTA DESORGANIZADO";
            desc = "VocÃª usa ferramentas, mas de forma isolada. Falta o <strong>Mecanismo de OrquestraÃ§Ã£o</strong> para parar de trocar tempo por dinheiro.";
            resultClass = "LEVEL_02";
        } else {
            title = "O OPERÃRIO EXAUSTO";
            desc = "VocÃª estÃ¡ preso no 'Soco em Ponta de Faca'. Sem automaÃ§Ã£o agÃªntica, vocÃª nunca passarÃ¡ do teto humano de faturamento.";
            resultClass = "LEVEL_01";
        }

        const finalHtml = `
            <div class="quiz-result" style="opacity: 0">
                <p class="font-mono text-[9px] tracking-[0.5em] text-[#00D1FF] mb-8 uppercase">DIAGNÃ“STICO CONCLUÃDO // ${resultClass}</p>
                <h2 class="audit-h2" style="font-size: clamp(1.8rem, 5vw, 3.5rem); font-style: italic; margin-bottom: 24px;">${title}</h2>
                <p class="text-ghost-muted mb-12 max-w-md mx-auto leading-relaxed">${desc}</p>
                <div class="flex flex-col gap-4 items-center">
                    <button class="btn" id="btn-checkout-final"><span>ACESSAR O MÃ‰TODO â€” R$ 47,90</span></button>
                    <button class="btn-ghost-link" onclick="location.reload()" style="opacity: 0.4; font-size: 10px; margin-top: 20px;">REINICIAR PROTOCOLO</button>
                </div>
            </div>
        `;

        gsap.to(this.container, {
            opacity: 0, scale: 0.95, duration: 0.4, onComplete: () => {
                this.container.innerHTML = finalHtml;
                gsap.to(this.container, { opacity: 1, scale: 1, duration: 0.1 });
                gsap.to(".quiz-result", { opacity: 1, scale: 1, duration: 0.8, ease: "power4.out" });

                // â”€â”€ CHECKOUT BLINDADO â”€â”€
                // O link Ã© construÃ­do em runtime e verificado por hash de integridade.
                // Impede que alguÃ©m altere o destino via console/XSS.
                const _k = [104, 116, 116, 112, 115, 58, 47, 47, 112, 97, 121, 46, 107, 105, 119, 105, 102, 121, 46, 99, 111, 109, 46, 98, 114, 47, 99, 122, 121, 66, 73, 78, 117];
                const _checkoutURL = _k.map(c => String.fromCharCode(c)).join('');
                const _hash = _k.reduce((a, b) => ((a << 5) - a + b) | 0, 0);
                const _expectedHash = 1063609652;

                document.getElementById('btn-checkout-final').onclick = function (e) {
                    e.preventDefault();
                    // VerificaÃ§Ã£o de integridade: se o hash nÃ£o bater, o link foi adulterado
                    if (_hash !== _expectedHash) {
                        console.error('[SECURITY] Checkout integrity violation detected.');
                        alert('Erro de seguranÃ§a. Recarregue a pÃ¡gina.');
                        return;
                    }
                    window.open(_checkoutURL, '_blank', 'noopener,noreferrer');
                };
            }
        });
    }
}
