import { EntityState, Input, Hitbox, Character, Skill, Animation, Motion} from "@rbxts/quarrelgame-framework";
import { CloseSlash, ForwardKick, LowHeavy } from "./normals";

const LEORIO = new Character.CharacterBuilder2D()
    .SetName("Leorio Sigmastare")
    .SetSubheader("I DIDN'T PAY TO BLOCK. I PAID TO GRAB.")
    .SetHeader("DON'T. GET. GRABBED.")
    .SetDescription("Test character 2")
    .SetModel(Character.GetCharacterModel<CharacterModels>().shedletsky as never)
    .SetEasiness(5)
    .SetAttack(Input.Slash, CloseSlash)
    .SetAttack(Input.Kick, ForwardKick)
    .SetAttack(Input.Heavy, LowHeavy)
    .SetAnimation(
        EntityState.Idle,
        new Animation.AnimationBuilder()
            .SetName("Idle")
            .SetAnimationId("rbxassetid://14280621593")
            .SetPriority(Enum.AnimationPriority.Idle)
            .SetLooped(true)
            .Construct(),
    )
    .SetAnimation(
        EntityState.Crouch,
        new Animation.AnimationBuilder()
            .SetName("Crouch")
            .SetAnimationId("rbxassetid://14288051389")
            .SetPriority(Enum.AnimationPriority.Movement)
            .SetLooped(true)
            .Construct(),
    )
    .AddSkill(
        new Skill.SkillBuilder()
            .SetName("Test Skill")
            .SetDescription("A test skill.")
            .SetFrameData(
                new Skill.FrameDataBuilder()
                    .SetAnimation(
                        new Animation.AnimationBuilder()
                            .SetName("Test Skill")
                            .SetAnimationId("rbxassetid://14280676559")
                            .SetPriority(Enum.AnimationPriority.Action)
                            .Construct(),
                    )
                    .SetStartup(4)
                    .SetActive(6)
                    .SetRecovery(-4)
                    .SetHitbox(
                        new Hitbox.HitboxBuilder()
                            .SetOffset()
                            .SetSize(new Vector3(7, 7, 7))
                            .Construct(),
                    ),
            )
            .SetGaugeRequired(25)
            .SetGroundedType(Skill.SkillGroundedType.Ground)
            .SetReversal(false)
            .Construct(),
    )
    .Construct();

export = LEORIO;
