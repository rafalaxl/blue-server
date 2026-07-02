/**
 * BLUE SERVER — QUIZ ENGINE (v1.1)
 * Architect: VisualMaster (Agentic Squad)
 * System: Linear × A24 Hibrid
 */

const quizData = [
    { id: "Q01", q: "Como você desenvolve código hoje?", options: [{ t: "Orquestro agentes em sandboxes autônomas.", v: 10 }, { t: "Uso Cursor/Copilot para autocompletar.", v: 5 }, { t: "Copio e colo respostas do ChatGPT.", v: 0 }] },
    { id: "Q02", q: "Quando sua base de código fica grande, o que acontece com a IA?", options: [{ t: "Ela lê meu Segundo Cérebro (Wiki/Markdown).", v: 10 }, { t: "Ela começa a alucinar e errar o contexto.", v: 5 }, { t: "Eu recomeço o chat do zero.", v: 0 }] },
    { id: "Q03", q: "Qual a sua maior dificuldade com IA agora?", options: [{ t: "Otimizar o ReAct cycle dos agentes.", v: 10 }, { t: "Fazer a IA entender a arquitetura inteira.", v: 5 }, { t: "Encontrar o 'prompt perfeito'.", v: 0 }] },
    { id: "Q04", q: "Se um agente autônomo cometer um erro crítico, como você previne o desastre?", options: [{ t: "BashGuards e permissões restritas (Sandbox).", v: 10 }, { t: "Eu olho o código antes dele rodar.", v: 5 }, { t: "Eu rezo para ele não quebrar tudo.", v: 0 }] },
    { id: "Q05", q: "Qual conceito é mais claro para você?", options: [{ t: "Decomposição Atômica de Tarefas.", v: 10 }, { t: "Engenharia de Prompts (Prompt Engineering).", v: 5 }, { t: "Vibe Coding (Codar na tentativa e erro).", v: 0 }] },
    { id: "Q06", q: "Como você resolve um bug persistente?", options: [{ t: "Injeto a Fórmula Delta: [Estado Atual] + [Esperado].", v: 10 }, { t: "Digo 'corrige isso, está dando erro'.", v: 5 }, { t: "Peço pra ela reescrever tudo.", v: 0 }] },
    { id: "Q07", q: "Seu foco atual de estudo de IA é:", options: [{ t: "Criar infraestruturas de orquestração.", v: 10 }, { t: "Aprender a programar mais rápido.", v: 5 }, { t: "Tentar não ficar obsoleto.", v: 0 }] }
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
                <p class="font-mono text-[9px] tracking-[0.5em] text-[#00D1FF] mb-8 uppercase">${step.id} — SCANNING PROTOCOL</p>
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
                <p class="font-mono text-[9px] tracking-[0.5em] text-[#00D1FF] mb-8 uppercase">VALIDAÇÃO DE IDENTIDADE</p>
                <h2 class="audit-h2" style="font-size: 2rem; margin-bottom: 40px;">Para onde enviamos o seu <br/><span class="text-[#00D1FF]">Blueprint de Orquestração</span>?</h2>
                
                <div class="flex flex-col gap-8 w-full max-w-md mx-auto text-left">
                    <div class="input-group">
                        <label class="font-mono text-[8px] uppercase tracking-widest opacity-40">Seu Melhor E-mail</label>
                        <input type="email" id="lead-email" class="audit-input" placeholder="seu@email.com" autocomplete="off">
                    </div>
                    <div class="input-group">
                        <label class="font-mono text-[8px] uppercase tracking-widest opacity-40">Usuário do X (Twitter)</label>
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

                    if (!email.includes('@')) return alert('Insira um e-mail válido.');

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
            desc = "Seu mindset está alinhado. Você entende os limites do prompt manual. O próximo passo é aplicar o Blueprint para orquestrar seus agentes na prática.";
            resultClass = "LEVEL_03";
        } else if (this.score >= 25) {
            title = "O DIALOGADOR DE IA";
            desc = "Você interage com a IA, mas de forma isolada e reativa. Falta a mecânica de um 'Segundo Cérebro' e a estruturação de tarefas autônomas.";
            resultClass = "LEVEL_02";
        } else {
            title = "O EXECUTOR OBSOLETO";
            desc = "Você está preso no Vibe Coding e copiando código de chats. Para não ficar para trás, você precisa urgentemente dominar as bases da Orquestração.";
            resultClass = "LEVEL_01";
        }

        const finalHtml = `
            <div class="quiz-result" style="opacity: 0">
                <p class="font-mono text-[9px] tracking-[0.5em] text-[#00D1FF] mb-8 uppercase">DIAGNÓSTICO CONCLUÍDO // ${resultClass}</p>
                <h2 class="audit-h2" style="font-size: clamp(1.8rem, 5vw, 3.5rem); font-style: italic; margin-bottom: 24px;">${title}</h2>
                <p class="text-ghost-muted mb-12 max-w-md mx-auto leading-relaxed">${desc}</p>
                <div class="flex flex-col gap-4 items-center">
                    <button class="btn" id="btn-checkout-final"><span>ACESSAR O BLUEPRINT — R$ 47,90</span></button>
                    <button class="btn-ghost-link" onclick="location.reload()" style="opacity: 0.4; font-size: 10px; margin-top: 20px;">REINICIAR PROTOCOLO</button>
                </div>
            </div>
        `;

        gsap.to(this.container, {
            opacity: 0, scale: 0.95, duration: 0.4, onComplete: () => {
                this.container.innerHTML = finalHtml;
                gsap.to(this.container, { opacity: 1, scale: 1, duration: 0.1 });
                gsap.to(".quiz-result", { opacity: 1, scale: 1, duration: 0.8, ease: "power4.out" });

                // ── CHECKOUT BLINDADO ──
                const _k = [104, 116, 116, 112, 115, 58, 47, 47, 112, 97, 121, 46, 107, 105, 119, 105, 102, 121, 46, 99, 111, 109, 46, 98, 114, 47, 99, 122, 121, 66, 73, 78, 117];
                const _checkoutURL = _k.map(c => String.fromCharCode(c)).join('');
                const _hash = _k.reduce((a, b) => ((a << 5) - a + b) | 0, 0);
                const _expectedHash = 1063609652;

                document.getElementById('btn-checkout-final').onclick = function (e) {
                    e.preventDefault();
                    if (_hash !== _expectedHash) {
                        console.error('[SECURITY] Checkout integrity violation detected.');
                        alert('Erro de segurança. Recarregue a página.');
                        return;
                    }
                    window.open(_checkoutURL, '_blank', 'noopener,noreferrer');
                };
            }
        });
    }
}
