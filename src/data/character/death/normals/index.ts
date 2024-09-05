import { Animation, Skill, Hitbox } from "@quarrelgame-framework/common";

export const ForwardKick = new Skill.SkillBuilder()
    .SetName("Forward Kick")
    .SetGroundedType(Skill.SkillGroundedType.Ground)
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(6)
            .SetActive(4)
            .SetRecovery(10)
            .SetContact(1)
            .SetBlock(-2)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, -0.25, 1.5))
                    .SetSize(new Vector3(2, 2, 2.75))
                    .Construct(),
            )
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("5K")
                    .SetAnimationId("rbxassetid://14321788726")
                    .Construct(),
            ),
    )
    .Construct();

export const Heavy = new Skill.SkillBuilder()
    .SetName("Heavy Slash")
    .SetGroundedType(Skill.SkillGroundedType.Ground)
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(13)
            .SetActive(8)
            .SetRecovery(15)
            .SetContact(21)
            .SetBlock(-4)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0, 3.45))
                    .SetSize(new Vector3(4, 6.75, 6))
                    .Construct(),
            )
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("5H")
                    .SetAnimationId("rbxassetid://96643414532857")
                    .Construct(),
            ),
    )
    .Construct();
// 5H 96643414532857
    
export const LowHeavy = new Skill.SkillBuilder()
    .SetName("Low Heavy Slash")
    .SetGroundedType(Skill.SkillGroundedType.Ground)
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(11)
            .SetActive(6)
            .SetRecovery(21)
            .SetContact(4)
            .SetBlock(8)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0.5, 2))
                    .SetSize(new Vector3(2, 2, 3.5))
                    .Construct(),
            )
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("2HS")
                    .SetAnimationId("rbxassetid://14322453534")
                    .Construct(),
            ),
    )
    .Construct();

export const ForwardPunch = new Skill.SkillBuilder()
    .SetName("Forward Punch")
    .SetGroundedType(Skill.SkillGroundedType.Ground)
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(6)
            .SetActive(4)
            .SetRecovery(10)
            .SetContact(1)
            .SetBlock(-2)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, -0.25, 1.5))
                    .SetSize(new Vector3(2, 2, 2.75))
                    .Construct(),
            )
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("6P")
                    .SetAnimationId("rbxassetid://14321788726")
                    .Construct(),
            ),
    )
    .Construct();

export const FarSlash = new Skill.SkillBuilder()
    .SetName("Close Slash")
    .SetGroundedType(Skill.SkillGroundedType.Ground)
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(7)
            .SetActive(6)
            .SetRecovery(10)
            .SetContact(3)
            .SetBlock(3)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0.5, 2))
                    .SetSize(new Vector3(2, 2, 3.5))
                    .Construct(),
            )
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .SetName("C.S")
                    .SetLooped(false)
                    .SetAnimationId("rbxassetid://14488052585")
                    .IsAttack()
                    .Construct(),
            ),
    )
    .Construct();

FarSlash.AddGatling(LowHeavy);
LowHeavy.AddGatling(ForwardKick);
ForwardKick.AddGatling(FarSlash);
